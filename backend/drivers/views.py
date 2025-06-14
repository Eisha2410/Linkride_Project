from rest_framework import viewsets, permissions
from .models import Vehicle
from .serializers import VehicleSerializer
from rest_framework.permissions import AllowAny

class VehicleViewSet(viewsets.ModelViewSet):
    serializer_class = VehicleSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Vehicle.objects.filter(driver=self.request.user)
