from django.contrib import admin
from .models import Question, Answer, User
# Register your models here.


# admin.site.register(User)
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(User)