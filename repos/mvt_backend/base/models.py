from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.

class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    body = models.TextField()


### real models
    
class Source(models.Model):
    TYPE_CHOICES = [
        ('youtube', 'Youtube'),
        ('spotify', 'Spotify'),
    ]

    url = models.URLField(max_length=200, unique=True)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    added_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='sources_added')
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.url

class UserSource(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    source = models.ForeignKey(Source, on_delete=models.CASCADE)
    date_started = models.DateTimeField(auto_now_add=True)
    date_stopped = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'{self.user.username} - {self.source.url}'