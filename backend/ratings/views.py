from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Avg
from .models import Rating
from .serializers import RatingSerializer
from backend.news.models import Article
from backend.news.serializers import ArticleSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_rating(request):
    article_id = request.data.get('article')
    score = int(request.data.get('score'))
    review = request.data.get('review', '')

    article = Article.objects.get(id=article_id)

    rating, created = Rating.objects.update_or_create(
        user=request.user,
        article=article,
        defaults={'score': score, 'review': review}
    )

    # Recalculate community average
    avg_rating = Rating.objects.filter(article=article).aggregate(avg=Avg('score'))['avg'] or 0
    community_score = avg_rating * 20  # convert 1–5 → 0–100

    # Recalculate final score
    article.final_score = (
        0.4 * article.source.trust_score +
        0.4 * community_score +
        0.2 * article.ai_score
    )
    article.save()

    return Response({"message": "Rating submitted", "final_score": article.final_score})


@api_view(['GET'])
def list_ratings(request, article_id):
    ratings = Rating.objects.filter(article_id=article_id)
    serializer = RatingSerializer(ratings, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_reviews(request):
    article_ids = (
        Rating.objects
        .filter(user=request.user)
        .values_list('article_id', flat=True)
    )

    articles = Article.objects.filter(id__in=article_ids)
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)
