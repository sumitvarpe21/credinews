from django.urls import path
from .views import add_rating, list_ratings, my_reviews

urlpatterns = [
    path('add/', add_rating),
    path('list/<int:article_id>/', list_ratings),
    path('my-reviews/', my_reviews),
]
