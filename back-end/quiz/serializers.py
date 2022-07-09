import re
from rest_framework import serializers
from .models import Question, Answer, User
from django.contrib.auth.hashers import make_password

class AnswerSerializer(serializers.ModelSerializer):

    class Meta:
        
        model = Answer
        fields = '__all__'


# class RegisterSerializer(serializers.ModelSerializer):

#    class Meta:
#         model = User
#         fields = ['email', 'username', 'password']
#         extra_kwargs = {'password': {'write_only': True}}


#         def create(self, validated_data):
       
#             user = User(
#                 email=validated_data['email'],
#                 username=validated_data['username']
                
               
#             )
#             user.set_password(make_password(validated_data['password']))
#             user.save()
#             return user


class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['email', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class QuestionSerializer(serializers.ModelSerializer):
    answer = AnswerSerializer(many=True, read_only=True)
    # answer = serializers.StringRelatedField(many=True,read_only=True,)
    
    class Meta:
        model=Question
        fields= ['pk','category','title','points','answer','seconds']
        # '__all__'
        # ['category','title','points','answer','ans']
