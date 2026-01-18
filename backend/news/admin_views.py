from django.contrib.auth.models import User
from django.db.models import Avg, Count
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from backend.news.models import Article
from backend.ratings.models import Rating

@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_dashboard(request):
    total_users = User.objects.count()
    total_articles = Article.objects.count()
    total_ratings = Rating.objects.count()

    avg_credibility = Article.objects.aggregate(
        avg=Avg('final_score')
    )['avg'] or 0

    most_rated = (
        Rating.objects
        .values('article__title')
        .annotate(count=Count('id'))
        .order_by('-count')[:5]
    )

    low_credibility = Article.objects.filter(final_score__lt=40)

    return Response({
        "total_users": total_users,
        "total_articles": total_articles,
        "total_ratings": total_ratings,
        "avg_credibility": round(avg_credibility, 2),
        "most_rated_articles": most_rated,
        "low_credibility_articles": [
            {"title": a.title, "score": a.final_score}
            for a in low_credibility
        ]
    })
