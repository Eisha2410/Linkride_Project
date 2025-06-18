from django.urls import path, include 
from .rider_views import (
    RideRetrieveUpdateDestroyAPIView,
    RideViewSet,
    JoinRideView,
    estimate_fare_view,
)
from rest_framework.routers import DefaultRouter
from .user_views import RegisterUserAPIView

router = DefaultRouter()
router.register(r'rides', RideViewSet)

urlpatterns = router.urls + [
    path('', include(router.urls)),

    path('register/', RegisterUserAPIView.as_view(), name='register'),
    path('rides/<int:pk>/', RideRetrieveUpdateDestroyAPIView.as_view(), name='ride-detail'),
    path('rides/<int:ride_id>/join/', JoinRideView.as_view(), name='join-ride'),
    path('estimate_fare/', estimate_fare_view, name='estimate_fare'),
]
