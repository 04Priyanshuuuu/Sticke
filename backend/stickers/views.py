from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import StickerSerializer
from .models import Sticker

class StickerViewSet(viewsets.ModelViewSet):
    authentication_classes = []  # or set token auth if you want
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Sticker.objects.all().order_by('-created_at')
    serializer_class = StickerSerializer
    lookup_field = 'id'
    parser_classes = [MultiPartParser, FormParser]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['category', 'title']
    ordering_fields = ['created_at', 'price']
    ordering = ['-created_at']
