from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import User
from .serializers import RegisterSerializer


# Register API
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


# Login Serializer
class LoginSerializer(TokenObtainPairSerializer):
    pass


# Login API
class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer