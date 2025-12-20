from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = [
            "id",
            "display_name",
            "bio",
            "profile_image",
            "location",
            "created_at",
        ]
        read_only_fields = ["created_at"]
