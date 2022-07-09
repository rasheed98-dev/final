from django.forms import ModelForm
from quiz.models import *

class QuestionForm(ModelForm):
    class Meta:
        model = Question
        fields = ['title', 'points','category','seconds']




class AnswerForm(ModelForm):
    class Meta:
        model = Answer
        fields = ['answer_text', 'is_right']











