from django.utils.deprecation import MiddlewareMixin

class PrintAuthHeaderMiddleware(MiddlewareMixin):
    def process_request(self, request):
        print("🔐 AUTH HEADER:", request.META.get("HTTP_AUTHORIZATION"))
