from django.contrib import admin
from .models import User, SellerProfile, Category, Product


admin.site.register(User)
admin.site.register(SellerProfile)
admin.site.register(Category)
admin.site.register(Product)