from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegistrationSerializer
from rest_framework.permissions import IsAuthenticated
from drivers.models import DriverProfile
from passengers.models import PassengerProfile
from drivers.serializers import DriverProfileSerializer
from passengers.serializers import PassengerProfileSerializer
from .models import User
from rest_framework.permissions import AllowAny
from rest_framework.authentication import BasicAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

@method_decorator(csrf_exempt, name='dispatch')
class UserRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        print("REGISTER HIT")
        serializer = UserRegistrationSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User registered successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserProfileView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        user = request.user
        if user.role == 'driver':
            try:
                profile = DriverProfile.objects.get(user=user)
                serializer = DriverProfileSerializer(profile)
            except DriverProfile.DoesNotExist:
                return Response({'error': 'Driver profile not found'}, status=status.HTTP_404_NOT_FOUND)

        elif user.role == 'passenger':
            try:
                profile = PassengerProfile.objects.get(user=user)
                serializer = PassengerProfileSerializer(profile)
            except PassengerProfile.DoesNotExist:
                return Response({'error': 'Passenger profile not found'}, status=status.HTTP_404_NOT_FOUND)

        else:
            return Response({'error': 'Invalid role'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer