from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Article
from .serializers import ArticleSerializer
from .ai_engine import analyze_text



@api_view(['GET'])
def articles_list(request):
    category = request.GET.get('category')
    search = request.GET.get('search')

    articles = Article.objects.all()

    if category:
        articles = articles.filter(category=category)

    if search:
        articles = articles.filter(title__icontains=search)

    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def submit_article(request):
    title = request.data.get('title')
    source_id = request.data.get('source')

    source = NewsSource.objects.get(id=source_id)

    # AI credibility analysis
    ai_score = analyze_text(title)

    # Final credibility score (without community rating for now)
    final_score = (0.6 * source.trust_score) + (0.4 * ai_score)

    article = Article.objects.create(
        title=title,
        url=request.data.get('url'),
        source=source,
        ai_score=ai_score,
        final_score=final_score
    )

    serializer = ArticleSerializer(article)
    return Response(serializer.data)

@api_view(['GET'])
def article_detail(request, pk):
    try:
        article = Article.objects.get(id=pk)
    except Article.DoesNotExist:
        return Response({"error": "Article not found"}, status=404)

    serializer = ArticleSerializer(article)
    return Response(serializer.data)
