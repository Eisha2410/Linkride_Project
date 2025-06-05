from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

class CNICAuthBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        UserModel = get_user_model()  # Get your custom user model
        try:
            # Try to fetch user where CNIC equals the given username
            user = UserModel.objects.get(cnic=username)
            # Check password
            if user.check_password(password):
                return user
        except UserModel.DoesNotExist:
            return None  # Return None if no match or invalid password
