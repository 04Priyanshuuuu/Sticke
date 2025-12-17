from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StickerViewSet, create_custom_sticker

router = DefaultRouter()
router.register(r'', StickerViewSet, basename='sticker')

urlpatterns = [
    path('custom-stickers/', create_custom_sticker),
    path('', include(router.urls)),
]
