from django.urls import path
from .views import articles_list, submit_article, article_detail
from .admin_views import admin_dashboard

urlpatterns = [
    path('articles/', articles_list),
    path('articles/<int:pk>/', article_detail),
    path('submit/', submit_article),
    path('admin/dashboard/', admin_dashboard),
]
