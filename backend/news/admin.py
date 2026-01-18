from django.contrib import admin
from .models import NewsSource, Article


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
	list_display = ("id", "title", "source", "ai_score", "final_score", "created_at", "summary")
	search_fields = ("title", "summary", "source__name")
	list_filter = ("source",)
	ordering = ("-created_at",)
	readonly_fields = ("ai_score", "final_score")


admin.site.register(NewsSource)
