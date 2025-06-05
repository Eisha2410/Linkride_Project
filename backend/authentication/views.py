from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CNICTokenObtainPairSerializer

class CNICTokenObtainPairView(TokenObtainPairView):
    serializer_class = CNICTokenObtainPairSerializer
