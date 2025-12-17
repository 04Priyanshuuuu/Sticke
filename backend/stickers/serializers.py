from rest_framework import serializers
from .models import CustomSticker, Sticker

class StickerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sticker
        fields = '__all__'

class CustomStickerSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomSticker
        fields = "__all__"
