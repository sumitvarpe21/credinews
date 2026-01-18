from django.db import models

class NewsSource(models.Model):
    name = models.CharField(max_length=100)
    domain = models.URLField()
    trust_score = models.IntegerField(default=50)

    def __str__(self):
        return self.name
 
 
class Article(models.Model):
    CATEGORY_CHOICES = [
        ('general', 'General'),
        ('politics', 'Politics'),
        ('business', 'Business'),
        ('economy', 'Economy'),
        ('education', 'Education'),
        ('law', 'Law'),
        ('technology', 'Technology'),
        ('science', 'Science'),
        ('health', 'Health'),
        ('environment', 'Environment'),
        ('sports', 'Sports'),
        ('entertainment', 'Entertainment'),
        ('world', 'World'),
        ('national', 'National'),
        ('other', 'Other'),
    ]

    title = models.CharField(max_length=200)
    summary = models.TextField(blank=True, default="")
    image_url = models.URLField(blank=True)
    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        default='general'
    )
    url = models.URLField()
    source = models.ForeignKey(NewsSource, on_delete=models.CASCADE)
    ai_score = models.FloatField(default=0)
    final_score = models.FloatField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
