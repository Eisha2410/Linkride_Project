from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import authenticate
from rest_framework import serializers

class CNICTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'cnic'

    def validate(self, attrs):
        cnic = attrs.get("cnic")
        password = attrs.get("password")

        user = authenticate(request=self.context.get("request"), username=cnic, password=password)

        if not user:
            raise serializers.ValidationError("Invalid CNIC or password")

        data = super().validate(attrs)
        data["user"] = {
            "id": user.id,
            "cnic": user.cnic,
            "full_name": user.full_name,
            "role": user.role,
        }
        return data
