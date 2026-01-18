from rest_framework import serializers
from .models import Rating

class RatingSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Rating
        fields = ['id', 'user', 'username', 'article', 'score', 'review', 'created_at']
        read_only_fields = ['user']
