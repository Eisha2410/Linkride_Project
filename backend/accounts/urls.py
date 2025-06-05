from django.urls import path
from .views import UserRegistrationView
from .views import UserProfileView
from accounts.views import CustomTokenObtainPairView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
]
