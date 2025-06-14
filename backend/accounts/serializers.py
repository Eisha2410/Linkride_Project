from rest_framework import serializers
from .models import User
from drivers.models import DriverProfile
from passengers.models import PassengerProfile

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            'cnic', 'phone_number', 'full_name', 'role',
            'password', 'email', 'organization', 'department', 'whatsapp_number', 'share_contact'
        ]
    

    def validate_cnic(self, value):
        if User.objects.filter(cnic=value).exists():
            raise serializers.ValidationError("A user with this CNIC already exists.")
        return value

    def validate_phone_number(self, value):
        if User.objects.filter(phone_number=value).exists():
            raise serializers.ValidationError("A user with this phone number already exists.")
        return value
        
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()

        request_data = self.context['request'].data

        if user.role == 'driver':
            vehicle_model = self.context['request'].data.get('vehicle_model')
            vehicle_number = self.context['request'].data.get('vehicle_number')
            vehicle_image = self.context['request'].data.get('vehicle_image')

            if not hasattr(user, 'driverprofile'):
                driver_profile = DriverProfile.objects.create(user=user)
                Vehicle.objects.create(
                    driver=driver_profile,
                    model=vehicle_model,
                    number=vehicle_number,
                    image=vehicle_image
                )
        elif user.role == 'passenger':
            if not hasattr(user, 'passengerprofile'):
                PassengerProfile.objects.create(user=user)

        return user

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from rest_framework import serializers

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'cnic'

    def validate(self, attrs):
        authenticate_kwargs = {
            'username': attrs['cnic'],
            'password': attrs['password'],
        }

        user = authenticate(**authenticate_kwargs)

        if not user:
            raise serializers.ValidationError('Invalid CNIC or password')

        data = super().validate(attrs)
        data['cnic'] = user.cnic
        return data
