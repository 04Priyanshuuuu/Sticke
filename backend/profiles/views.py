from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import UserProfile
from .serializers import UserProfileSerializer
from orders.models import Order
from orders.serializers import OrderSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()  
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserProfile.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def dashboard(request):
    profile, _ = UserProfile.objects.get_or_create(user=request.user)

    orders_qs = Order.objects.filter(user=request.user).order_by("-created_at")
    orders = orders_qs[:5]

    return Response({
    "name": profile.display_name or request.user.email,
    "email": request.user.email,
    "bio": profile.bio,                           
    "location": profile.location,                 
    "profile_image": (
        request.build_absolute_uri(profile.profile_image.url)
        if profile.profile_image else None
    ),
    "joined_date": profile.created_at,
    "total_orders": orders_qs.count(),
    "reward_points": orders_qs.count() * 10,
    "custom_uploads": 3,
    "orders": OrderSerializer(orders, many=True).data,
})



@api_view(["GET", "PATCH"])
@permission_classes([IsAuthenticated])
def me(request):
    profile, _ = UserProfile.objects.get_or_create(user=request.user)

    if request.method == "GET":
        return Response(UserProfileSerializer(profile).data)

    serializer = UserProfileSerializer(profile, data=request.data, partial=True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)
