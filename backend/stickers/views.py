from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import CustomStickerSerializer, StickerSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Sticker

class StickerViewSet(viewsets.ModelViewSet):
    authentication_classes = []  # or set token auth if you want
    permission_classes = [AllowAny]
    queryset = Sticker.objects.all().order_by('-created_at')
    serializer_class = StickerSerializer
    lookup_field = 'id'
    parser_classes = [MultiPartParser, FormParser]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['category', 'title']
    ordering_fields = ['created_at', 'price']
    ordering = ['-created_at']



@api_view(["POST"])
@permission_classes([AllowAny])
def create_custom_sticker(request):
    serializer = CustomStickerSerializer(data=request.data)
    if serializer.is_valid():
        sticker = serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


 

 
