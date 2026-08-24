from rest_framework import serializers
from .models import User, Category, Product, ProductImage, Cart, Wishlist, Checkout, Order, Payment
import random
import datetime
from django.utils import timezone



class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password',
            'phone',
            'role'
        ]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            phone=validated_data.get('phone', ''),
            role=validated_data.get('role', 'customer')
        )
        return user


class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        try:
            User.objects.get(email=value)
        except User.DoesNotExist:
            raise serializers.ValidationError(
                "User with this email does not exist."
            )
        return value

    def save(self):
        email = self.validated_data["email"]
        user = User.objects.get(email=email)

        otp = str(random.randint(100000, 999999))

        user.otp = otp
        user.otp_created_at = timezone.now()
        user.save()

        return {
            "message": "OTP generated successfully.",
            "otp": otp
        }


class VerifyOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)

    def validate(self, attrs):
        email = attrs.get("email")
        otp = attrs.get("otp")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("User not found.")

        if user.otp != otp:
            raise serializers.ValidationError("Invalid OTP.")

        return attrs


class ResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    new_password = serializers.CharField(write_only=True)

    def save(self):
        email = self.validated_data["email"]
        new_password = self.validated_data["new_password"]

        user = User.objects.get(email=email)
        user.set_password(new_password)

        user.otp = None
        user.otp_created_at = None
        user.save()

        return {
            "message": "Password reset successfully."
        }


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'is_primary']


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    category_name = serializers.ReadOnlyField(source='category.name')

    class Meta:
        model = Product
        fields = '__all__'

    def create(self, validated_data):
        request = self.context.get('request')
        product = Product.objects.create(**validated_data)
        if request and request.FILES:
            images_data = request.FILES.getlist('images')
            primary_index = int(request.data.get('primaryImageIndex', 0))
            for i, image_file in enumerate(images_data):
                is_primary = (i == primary_index)
                ProductImage.objects.create(product=product, image=image_file, is_primary=is_primary)
        return product

    def update(self, instance, validated_data):
        request = self.context.get('request')
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if request:
            delete_ids = request.data.getlist('delete_image_ids')
            if delete_ids:
                ProductImage.objects.filter(id__in=delete_ids, product=instance).delete()

            if request.FILES:
                images_data = request.FILES.getlist('images')
                primary_index = int(request.data.get('primaryImageIndex', 0))
                
                if primary_index >= 0:
                    ProductImage.objects.filter(product=instance).update(is_primary=False)
                    
                for i, image_file in enumerate(images_data):
                    is_primary = (i == primary_index)
                    ProductImage.objects.create(product=instance, image=image_file, is_primary=is_primary)
            
            elif 'primary_image_id' in request.data:
                primary_id = request.data.get('primary_image_id')
                ProductImage.objects.filter(product=instance).update(is_primary=False)
                ProductImage.objects.filter(id=primary_id, product=instance).update(is_primary=True)

        return instance


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = "__all__"


class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = "__all__"


class CheckoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Checkout
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    whatsapp_url = serializers.SerializerMethodField()
    product_name = serializers.ReadOnlyField(source='product.name')

    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ['order_id']

    def validate(self, attrs):
        product = attrs.get('product')
        if not product and self.instance:
            product = self.instance.product
            
        quantity = attrs.get('quantity')
        if quantity is None:
            if self.instance:
                quantity = self.instance.quantity
            else:
                quantity = 1

        is_create = self.instance is None
        
        if is_create:
            if not product:
                raise serializers.ValidationError({"product": "Product is required."})
            if product.status != 'Active':
                raise serializers.ValidationError({"product": "This product is not active."})
            if product.stock < quantity:
                raise serializers.ValidationError({"quantity": f"Only {product.stock} items are available in stock."})
        else:
            if 'product' in attrs or 'quantity' in attrs:
                if not product:
                    raise serializers.ValidationError({"product": "Product does not exist."})
                old_qty = self.instance.quantity if self.instance else 0
                qty_diff = quantity - old_qty
                if qty_diff > 0 and product.stock < qty_diff:
                    raise serializers.ValidationError({"quantity": f"Only {product.stock} additional items are available in stock."})
                    
        return attrs

    def create(self, validated_data):
        product = validated_data['product']
        quantity = validated_data['quantity']

        # Calculate pricing details from database values (DO NOT trust frontend inputs)
        validated_data['original_price'] = product.original_price
        validated_data['discount_percentage'] = product.discount_percentage
        validated_data['selling_price'] = product.selling_price
        validated_data['total_amount'] = product.selling_price * quantity

        # Decrease stock
        product.stock -= quantity
        product.save()

        # Generate unique order id
        today = datetime.datetime.now().strftime("%Y%m%d")
        for _ in range(10):
            order_id = f"ORD-{today}-{random.randint(100, 999)}"
            if not Order.objects.filter(order_id=order_id).exists():
                break
        else:
            order_id = f"ORD-{today}-{random.randint(1000, 9999)}"

        validated_data['order_id'] = order_id
        order = Order.objects.create(**validated_data)

        # Trigger WhatsApp Business Cloud API notification if configured
        try:
            from .whatsapp import send_whatsapp_notification
            primary_img_obj = product.images.filter(is_primary=True).first() or product.images.first()
            image_url = ""
            if primary_img_obj and primary_img_obj.image:
                image_url = primary_img_obj.image.url
                request = self.context.get('request')
                if request:
                    image_url = request.build_absolute_uri(image_url)
                else:
                    from django.conf import settings as django_settings
                    image_url = f"{django_settings.BACKEND_BASE_URL}{image_url}"

            msg = (
                "NEW ORDER RECEIVED\n"
                "━━━━━━━━━━━━━━━━\n"
                "Order ID:\n"
                f"{order.order_id}\n"
                "CUSTOMER DETAILS\n"
                f"Name: {order.customer_name}\n"
                f"Mobile: {order.customer_phone}\n"
                f"Email: {order.customer_email}\n"
                "DELIVERY ADDRESS\n"
                f"{order.delivery_address}\n"
                f"{order.city}\n"
                f"{order.state}\n"
                f"PIN: {order.pin_code}\n"
                "PRODUCT DETAILS\n"
                "Product:\n"
                f"{order.product.name}\n"
                "Quantity:\n"
                f"{order.quantity}\n"
                "Original Price:\n"
                f"₹{int(order.original_price):,}\n"
                "Discount:\n"
                f"{int(order.discount_percentage)}%\n"
                "Selling Price:\n"
                f"₹{int(order.selling_price):,}\n"
                "TOTAL:\n"
                f"₹{int(order.total_amount):,}\n"
                "ORDER STATUS:\n"
                f"{order.status}\n"
                "━━━━━━━━━━━━━━━━"
            )
            send_whatsapp_notification(order, msg, image_url)
        except Exception as e:
            import logging
            logger = logging.getLogger(__name__)
            logger.error(f"Failed to auto-send WhatsApp Cloud API message: {str(e)}")

        return order

    def get_whatsapp_url(self, obj):
        from django.conf import settings
        import urllib.parse
        
        admin_number = getattr(settings, 'ADMIN_WHATSAPP_NUMBER', '919786497111')
        clean_number = ''.join(c for c in admin_number if c.isdigit())
        
        product = obj.product
        primary_img_obj = None
        if product:
            primary_img_obj = product.images.filter(is_primary=True).first() or product.images.first()
            
        image_url = ""
        if primary_img_obj and primary_img_obj.image:
            image_url = primary_img_obj.image.url
            request = self.context.get('request')
            if request:
                image_url = request.build_absolute_uri(image_url)
            else:
                from django.conf import settings as django_settings
                image_url = f"{django_settings.BACKEND_BASE_URL}{image_url}"

        img_line = f"Product Image:\n{image_url}\n" if image_url else ""
        
        msg = (
            "NEW ORDER RECEIVED\n"
            "━━━━━━━━━━━━━━━━\n"
            "Order ID:\n"
            f"{obj.order_id}\n"
            "CUSTOMER DETAILS\n"
            f"Name: {obj.customer_name}\n"
            f"Mobile: {obj.customer_phone}\n"
            f"Email: {obj.customer_email}\n"
            "DELIVERY ADDRESS\n"
            f"{obj.delivery_address}\n"
            f"{obj.city}\n"
            f"{obj.state}\n"
            f"PIN: {obj.pin_code}\n"
            "PRODUCT DETAILS\n"
            "Product:\n"
            f"{obj.product.name}\n"
            f"{img_line}"
            "Quantity:\n"
            f"{obj.quantity}\n"
            "Original Price:\n"
            f"₹{int(obj.original_price):,}\n"
            "Discount:\n"
            f"{int(obj.discount_percentage)}%\n"
            "Selling Price:\n"
            f"₹{int(obj.selling_price):,}\n"
            "TOTAL:\n"
            f"₹{int(obj.total_amount):,}\n"
            "ORDER STATUS:\n"
            f"{obj.status}\n"
            "━━━━━━━━━━━━━━━━"
        )
        
        encoded_msg = urllib.parse.quote(msg)
        return f"https://wa.me/{clean_number}?text={encoded_msg}"

    def update(self, instance, validated_data):
        old_status = instance.status
        new_status = validated_data.get('status', old_status)

        order = super().update(instance, validated_data)

        if old_status != new_status:
            try:
                from .whatsapp import send_whatsapp_notification
                
                product = order.product
                primary_img_obj = product.images.filter(is_primary=True).first() or product.images.first()
                image_url = ""
                if primary_img_obj and primary_img_obj.image:
                    image_url = primary_img_obj.image.url
                    request = self.context.get('request')
                    if request:
                        image_url = request.build_absolute_uri(image_url)
                    else:
                        from django.conf import settings as django_settings
                        image_url = f"{django_settings.BACKEND_BASE_URL}{image_url}"

                new_status_upper = new_status.upper()
                msg = (
                    "ORDER STATUS UPDATE\n\n"
                    f"Hello {order.customer_name},\n\n"
                    "Your order status has been updated.\n\n"
                    "Order ID:\n"
                    f"{order.order_id}\n\n"
                    "Product:\n"
                    f"{order.product.name}\n\n"
                    "Quantity:\n"
                    f"{order.quantity}\n\n"
                    "Total:\n"
                    f"₹{int(order.total_amount):,}\n\n"
                    "Previous Status:\n"
                    f"{old_status}\n\n"
                    "New Status:\n"
                    f"{new_status_upper}\n\n"
                    "Thank you for your purchase."
                )

                send_whatsapp_notification(order, msg, image_url, recipient_phone=order.customer_phone)
            except Exception as e:
                import logging
                logger = logging.getLogger(__name__)
                logger.error(f"Failed to auto-send WhatsApp buyer status update message: {str(e)}")

        return order


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = "__all__"