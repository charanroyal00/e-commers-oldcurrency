from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    ForgotPasswordView,
    VerifyOTPView,
    ResetPasswordView,
    CategoryListCreateView,
    CategoryDetailView,
    ProductListCreateView,
    ProductDetailView,
    CartListCreateView,
    CartDetailView,
    WishlistListCreateView,
    WishlistDetailView,
    CheckoutListCreateView,
    CheckoutDetailView,
    OrderListCreateView,
    OrderDetailView,
    PaymentListCreateView,
    PaymentDetailView,
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("forgot-password/", ForgotPasswordView.as_view(), name="forgot-password"),
    path("verify-otp/", VerifyOTPView.as_view(), name="verify-otp"),
    path("reset-password/", ResetPasswordView.as_view(), name="reset-password"),

    # Category APIs
    path("categories/", CategoryListCreateView.as_view(), name="category-list"),
    path("categories/<int:pk>/", CategoryDetailView.as_view(), name="category-detail"),

    # Product APIs
    path("products/", ProductListCreateView.as_view(), name="product-list"),
    path("products/<int:pk>/", ProductDetailView.as_view(), name="product-detail"),

    # Cart APIs
    path("cart/", CartListCreateView.as_view(), name="cart-list"),
    path("cart/<int:pk>/", CartDetailView.as_view(), name="cart-detail"),

    # Wishlist APIs
    path("wishlist/", WishlistListCreateView.as_view(), name="wishlist-list"),
    path("wishlist/<int:pk>/", WishlistDetailView.as_view(), name="wishlist-detail"),

    # Checkout APIs
    path("checkout/", CheckoutListCreateView.as_view(), name="checkout-list"),
    path("checkout/<int:pk>/", CheckoutDetailView.as_view(), name="checkout-detail"),

    # Order APIs
    path("orders/", OrderListCreateView.as_view(), name="order-list"),
    path("orders/<int:pk>/", OrderDetailView.as_view(), name="order-detail"),

    # Payment APIs
    path("payments/", PaymentListCreateView.as_view(), name="payment-list"),
    path("payments/<int:pk>/", PaymentDetailView.as_view(), name="payment-detail"),
]