# Backend APIs Still Needed

## ℹ️ Current Status

The login is working, but the dashboard shows 404 errors because the following backend APIs haven't been implemented yet. This is **normal** and **doesn't break** the frontend - it just shows empty states with zero values.

---

## 🔴 Missing Backend Endpoints

### 1. **Products API**
```
GET /api/products/
Response: { results: Product[], count: number }

GET /api/products/:id/
Response: Product

POST /api/products/
Request: Product data
Response: Product

PUT /api/products/:id/
Request: Product data
Response: Product

DELETE /api/products/:id/
Response: { message: string }
```

**Product Model:**
```typescript
{
  id: number
  name: string
  description: string
  category: string
  condition: 'mint' | 'excellent' | 'good' | 'fair'
  price: number
  stock: number
  images: string[]
  status: 'active' | 'inactive'
  created_at: string
}
```

### 2. **Orders API**
```
GET /api/orders/
Response: { results: Order[], count: number }

GET /api/orders/:id/
Response: Order

GET /api/orders/stats/
Response: OrderStats

PUT /api/orders/:id/
Request: { status: string }
Response: Order
```

**Order Model:**
```typescript
{
  id: number
  order_number: string
  customer_name: string
  customer_email: string
  items: OrderItem[]
  total_amount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  created_at: string
}
```

**OrderStats Model:**
```typescript
{
  total_orders: number
  pending_orders: number
  completed_orders: number
  total_revenue: number
  monthly_revenue: number
}
```

### 3. **Inventory API**
```
GET /api/inventory/stats/
Response: InventoryStats
```

**InventoryStats Model:**
```typescript
{
  total_products: number
  low_stock_count: number
  out_of_stock_count: number
  total_inventory_value: number
}
```

---

## ✅ What's Already Working

- ✅ **Login API** (`POST /api/login/`) - Fully functional
- ✅ **User Registration** (if implemented)
- ✅ **JWT Authentication** - Access and refresh tokens
- ✅ **CORS** - Properly configured

---

## 🎯 Priority Order

For the backend developer to implement (in order of priority):

1. **Products API** - Most important for marketplace functionality
   - Start with GET endpoint to list products
   - Then add POST to create products
   - Finally PUT/DELETE for editing

2. **Inventory Stats API** - Simple aggregation endpoint
   - Count total products
   - Count products with stock < 10 (low stock)
   - Calculate total inventory value

3. **Orders API** - For transaction management
   - GET orders list
   - GET order stats (aggregations)
   - PUT to update order status

---

## 📋 Implementation Notes

### Django Example for Products:

```python
# accounts/models.py
class Product(models.Model):
    CONDITION_CHOICES = (
        ('mint', 'Mint'),
        ('excellent', 'Excellent'),
        ('good', 'Good'),
        ('fair', 'Fair'),
    )
    
    STATUS_CHOICES = (
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    )
    
    name = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=100)
    condition = models.CharField(max_length=20, choices=CONDITION_CHOICES)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

# accounts/serializers.py
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

# accounts/views.py
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

# config/urls.py
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'products', ProductViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
```

---

## 🔍 How Frontend Handles Missing APIs

The frontend is designed to gracefully handle missing backend endpoints:

1. **Shows loading states** while fetching
2. **Catches 404 errors** silently
3. **Displays empty states** with helpful messages
4. **Uses zero values** for stats (0 products, 0 orders, ₹0 revenue)
5. **Shows info banner** explaining APIs are in development

The 404 errors in the browser console are **expected** and **harmless**. They will disappear once the backend implements the APIs.

---

## 📞 For Backend Developer

**Current Status:**
- ✅ Login working perfectly
- ❌ Products API needed
- ❌ Orders API needed  
- ❌ Inventory Stats API needed

**What to do:**
1. Create the Product model
2. Create serializers
3. Create ViewSet or APIView
4. Register URL routes
5. Test with Postman or frontend
6. Repeat for Orders and Inventory

**Testing:**
Once you implement an endpoint, the frontend will automatically:
- Stop showing 404 errors for that endpoint
- Display real data instead of zeros
- Update in real-time (no frontend changes needed)

---

## 🚀 Quick Win

Start with the **Products GET endpoint** - it's the easiest and will immediately show results in the frontend Products page and Dashboard.

```python
# Simplest implementation:
@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response({
        'results': serializer.data,
        'count': products.count()
    })
```

Add to `config/urls.py`:
```python
path('api/products/', get_products),
```

That's it! The frontend will immediately show products in the dashboard and products page.

---

*Generated to help backend developer understand what APIs are needed*
