# Login Integration Fix - Complete Guide

## 🔴 Problem Identified

**Error:** `POST http://localhost:8000/api/login/ 400 (Bad Request)`

**Root Cause:** The Django Simple JWT `TokenObtainPairView` expects `username` + `password` by default, but the frontend is sending `email` + `password`.

---

## ✅ Solution Applied

### Backend Changes Made

**File:** `accounts/views.py`

**What Changed:**
- Customized `LoginSerializer` to accept `email` instead of `username`
- Added proper error handling with clear error messages
- The serializer now:
  1. Accepts `email` and `password` from the frontend
  2. Looks up the user by email
  3. Authenticates using Django's built-in `authenticate()` with username
  4. Returns JWT tokens on success

**Code Added:**
```python
from rest_framework.exceptions import ValidationError
from django.contrib.auth import authenticate

class LoginSerializer(TokenObtainPairSerializer):
    username_field = 'email'
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Replace username field with email
        self.fields['email'] = self.fields.pop('username')
    
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        
        if not email or not password:
            raise ValidationError({
                'detail': 'Email and password are required'
            })
        
        try:
            user = User.objects.get(email=email)
            authenticated_user = authenticate(username=user.username, password=password)
            if authenticated_user is None:
                raise ValidationError({
                    'detail': 'Invalid email or password'
                })
        except User.DoesNotExist:
            raise ValidationError({
                'detail': 'Invalid email or password'
            })
        
        attrs['username'] = user.username
        data = super().validate(attrs)
        return data
```

---

## 🚀 How to Test

### 1. **Restart Django Server**

```cmd
# Make sure you're in the project root
cd C:\Users\HP\old-currency-marketplace

# Activate virtual environment
.\venv\Scripts\activate

# Stop the server (Ctrl+C if running)
# Then restart:
python manage.py runserver
```

### 2. **Ensure Frontend is Running**

```cmd
# In a NEW terminal window
cd C:\Users\HP\old-currency-marketplace
npm run dev
```

### 3. **Test Login**

- Navigate to: `http://localhost:5173/admin/login`
- Enter credentials:
  - **Email:** `pranathi@gmail.com`
  - **Password:** `Pranathi@12345`
- Click "Sign In as Admin"

---

## 📋 Expected API Behavior

### Request Format (Frontend sends):
```json
POST /api/login/
Content-Type: application/json

{
  "email": "pranathi@gmail.com",
  "password": "Pranathi@12345"
}
```

### Success Response (Backend returns):
```json
HTTP 200 OK

{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

### Error Responses:
```json
HTTP 400 Bad Request

{
  "detail": "Email and password are required"
}
```

```json
HTTP 400 Bad Request

{
  "detail": "Invalid email or password"
}
```

---

## 🔍 Verification Checklist

Before testing, verify:

- [ ] `config/settings.py` has CORS configuration:
  ```python
  CORS_ALLOWED_ORIGINS = [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
  ]
  CORS_ALLOW_CREDENTIALS = True
  ```

- [ ] `corsheaders` is in `INSTALLED_APPS`
- [ ] `corsheaders.middleware.CorsMiddleware` is in `MIDDLEWARE`
- [ ] Django server restarted after changes
- [ ] Test user exists in database with email `pranathi@gmail.com`

---

## 🧪 Test User Creation (If Needed)

If the test user doesn't exist, create it:

```python
# In Django shell
python manage.py shell

# Then run:
from accounts.models import User
User.objects.create_user(
    username='pranathi',
    email='pranathi@gmail.com',
    password='Pranathi@12345',
    role='admin'
)
```

---

## 🐛 Troubleshooting

### Still getting 400 Bad Request?

1. **Check Django server logs** for the exact error message
2. **Verify request payload** in browser DevTools → Network tab → Request payload should show:
   ```json
   {"email": "pranathi@gmail.com", "password": "Pranathi@12345"}
   ```

### Getting 401 Unauthorized?

- Password is incorrect
- User doesn't exist in database
- Verify user exists: `python manage.py shell` → `User.objects.filter(email="pranathi@gmail.com").exists()`

### Still seeing CORS errors?

- CORS configuration is missing or incorrect in `settings.py`
- Django server wasn't restarted after adding CORS config

---

## 📝 Summary for Backend Developer

**Tell her:**

1. ✅ **Backend fix applied** - `accounts/views.py` updated to accept `email` instead of `username`
2. ✅ **CORS configured** - `config/settings.py` has proper CORS settings
3. 🔄 **Action required** - She needs to **restart the Django server** to apply changes
4. 🧪 **Test credentials** - Email: `pranathi@gmail.com`, Password: `Pranathi@12345`
5. ℹ️ **Note** - Make sure this user exists in the database with the correct password

If she encounters any issues, ask her to share:
- The **exact error message** from Django server console
- The **request payload** from browser DevTools
- Output of: `User.objects.filter(email="pranathi@gmail.com").exists()`

---

## ✅ Expected Result

After applying these changes and restarting the server:
- Login request should succeed with HTTP 200
- Frontend receives `access` and `refresh` tokens
- User is redirected to `/dashboard`
- No CORS errors in browser console
