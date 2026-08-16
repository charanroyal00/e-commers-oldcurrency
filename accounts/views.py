from rest_framework import generics, status, serializers
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import ValidationError
from django.contrib.auth import authenticate

from .models import User
from .serializers import RegisterSerializer


# Register API
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


# Login Serializer - Customized to accept email instead of username
class LoginSerializer(TokenObtainPairSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)
    
    # Remove the default username field
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Remove username field if it exists
        if 'username' in self.fields:
            del self.fields['username']
    
    def validate(self, attrs):
        # Get email and password from request
        email = attrs.get('email')
        password = attrs.get('password')
        
        if not email or not password:
            raise ValidationError('Email and password are required')
        
        # Find user by email
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise ValidationError('Invalid email or password')
        
        # Authenticate using username (required by Django)
        authenticated_user = authenticate(username=user.username, password=password)
        
        if authenticated_user is None:
            raise ValidationError('Invalid email or password')
        
        # Generate JWT tokens
        refresh = self.get_token(authenticated_user)
        
        data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
        
        return data


# Login API
class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer