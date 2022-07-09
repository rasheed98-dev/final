from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.conf import settings
from django.contrib.auth.models import User

# Create your models here.

class User(AbstractUser):
    pass



categories = [
  ('General','General'),
    ('Front-end', 'Front-end'),
    ('Back-end','Back-end'),
    ('Mobil-app','Mobil-app'),
    ('AI','AI'),
    ('Gamming','Gamming')
    
]


class Question(models.Model):
    category = models.CharField(max_length=30, choices=categories, default='General')
    title = models.CharField(max_length=200, null=False)
    points=models.IntegerField()
    seconds=models.IntegerField()

    def __str__(self):
      return f"{self.title}"



class Answer(models.Model):
    question=models.ForeignKey(Question,related_name='answer' ,on_delete=models.DO_NOTHING)
    answer_text = models.CharField(max_length=255)
    is_right = models.BooleanField(default=False)
    def __str__(self):
      return f"{self.answer_text}"


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def TokenCreate(sender, instance, created, **kwargs):
    if created:
        Token.objects.create(user=instance)