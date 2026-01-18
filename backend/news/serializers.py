from rest_framework import serializers
from .models import Article, NewsSource

class NewsSourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsSource
        fields = '__all__'

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = [
            'id',
            'title',
            'summary',
            'image_url',
            'category',
            'ai_score',
            'final_score'
        ]