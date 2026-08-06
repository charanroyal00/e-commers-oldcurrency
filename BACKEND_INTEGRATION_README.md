# Backend Integration Guide

## Overview
This document explains how the frontend has been integrated with the Django backend APIs. The frontend now uses real API calls instead of dummy data.

## What's Been Done

### 1. API Services Layer
Created a complete API services layer in `src/services/`:
- **`api.ts`**: Base API service with authentication, error handling, and HTTP methods
- **`auth.ts`**: Authentication service for login/register
- **`products.ts`**: Products and categories management
- **`orders.ts`**: Order management and statistics
- **`inventory.ts`**: Inventory tracking and stock management
- **`index.ts`**: Service exports for easy imports

### 2. API Configuration
- **`src/config/api.ts`**: Centralized API configuration
- Backend URL: `http://localhost:8000/api` (configurable via environment)
- Environment variables support for production deployment

### 3. Updated Pages with API Integration

#### Authentication Pages:
- **AdminLogin.tsx**: Real login API with error handling
- **SellerLogin.tsx**: Real login API with error handling  
- **SellerRegister.tsx**: Real registration API with validation errors

#### Dashboard Pages:
- **Dashboard.tsx**: Live statistics from orders/products/inventory APIs
- **Products.tsx**: Product listing with CRUD operations
- **Orders.tsx**: Order management with real data
- **OrderDetail.tsx**: Order details with status updates
- **AddProduct.tsx**: Product creation with file uploads

### 4. Features Implemented

#### Error Handling:
- Network error handling
- API validation errors
- User-friendly error messages
- Loading states for all API calls

#### Authentication:
- JWT token management
- Automatic token storage/retrieval
- Token refresh (prepared for implementation)
- Role-based access (admin/seller distinction)

#### Data Management:
- Real-time product statistics
- Order status tracking
- Inventory management
- File upload support

## Backend API Endpoints Expected

Based on the Django backend structure found, the following endpoints are expected:

### Authentication:
```
POST /api/login/     - User login (returns JWT tokens)
POST /api/register/  - User registration
```

### Products (Expected):
```
GET    /api/products/           - List products
POST   /api/products/           - Create product
GET    /api/products/{id}/      - Get product details
PATCH  /api/products/{id}/      - Update product
DELETE /api/products/{id}/      - Delete product
GET    /api/categories/         - List categories
POST   /api/categories/         - Create category
```

### Orders (Expected):
```
GET    /api/orders/             - List orders
GET    /api/orders/{id}/        - Get order details
PATCH  /api/orders/{id}/        - Update order status
GET    /api/orders/stats/       - Get order statistics
```

### Inventory (Expected):
```
GET    /api/inventory/          - List inventory items
PATCH  /api/inventory/{id}/     - Update stock levels
GET    /api/inventory/stats/    - Get inventory statistics
```

## Setup Instructions

### 1. Environment Variables
Create a `.env` file in the root directory:
```
VITE_API_BASE_URL=http://localhost:8000/api
```

### 2. Backend Setup
Ensure the Django backend is running on `http://localhost:8000` with:
- CORS enabled for `http://localhost:5173` (Vite dev server)
- All expected API endpoints implemented
- JWT authentication configured

### 3. Start Development
```bash
npm run dev
```

## API Integration Status

### ✅ Completed:
- Authentication (login/register)
- Products listing and creation
- Orders listing and details
- Dashboard statistics
- Error handling and loading states
- File upload preparation

### ⚠️ Needs Backend Implementation:
The following APIs are called by the frontend but need to be implemented in Django:
- Product CRUD operations
- Order management endpoints
- Inventory management
- Category management
- User profile management

### 🔄 To Be Enhanced:
- Image/file upload handling
- Advanced filtering and pagination
- Real-time updates
- Better error recovery
- Offline support

## Testing the Integration

### 1. Authentication Test:
1. Go to `/admin/login` or `/seller/login`
2. Try logging in - should show loading state and error handling
3. Check browser network tab for API calls to `http://localhost:8000/api/login/`

### 2. Products Test:
1. Go to `/products`
2. Should show loading state, then empty state or error if backend not available
3. Try adding a product via `/products/add`

### 3. Dashboard Test:
1. Go to `/dashboard`
2. Should show loading states for all statistics
3. Will show 0 values if backend is not available

## Common Issues & Solutions

### 1. CORS Errors:
**Problem**: Browser blocks API requests
**Solution**: Add CORS middleware in Django settings:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Vite dev server
]
```

### 2. 404 API Errors:
**Problem**: API endpoints not found
**Solution**: Ensure Django URLs are properly configured and match the expected endpoints

### 3. Authentication Errors:
**Problem**: Login fails with 401/403
**Solution**: Check Django JWT configuration and user model setup

## Next Steps

1. **Complete Django Backend**: Implement all expected API endpoints
2. **Test Integration**: Test all CRUD operations with real data
3. **File Uploads**: Configure Django to handle image uploads
4. **Production Deployment**: Update API URLs for production
5. **Real-time Features**: Add WebSocket support for live updates

## File Structure
```
src/
├── config/
│   └── api.ts              # API configuration
├── services/
│   ├── api.ts              # Base API service
│   ├── auth.ts             # Authentication
│   ├── products.ts         # Products management
│   ├── orders.ts           # Order management
│   ├── inventory.ts        # Inventory management
│   └── index.ts            # Service exports
└── pages/
    ├── auth/               # Login/Register pages (API integrated)
    ├── products/           # Product management (API integrated)
    └── *.tsx               # Other pages (API integrated)
```

The frontend is now fully prepared for backend integration and will work seamlessly once the Django APIs are implemented.