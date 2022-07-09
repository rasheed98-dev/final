from pickle import TRUE
from turtle import title
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.urls import reverse
from django.http.response import JsonResponse
from yaml import serialize
from .models import Question, Answer, User
from rest_framework.decorators import api_view
from .serializers import QuestionSerializer, AnswerSerializer, RegisterSerializer
from rest_framework import status, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.http import Http404
from django.db.models import Q
from .form import QuestionForm, AnswerForm
from django.forms import modelform_factory
from django.contrib.auth.hashers import make_password
from rest_framework.authentication import BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated

# Create your views here.
@api_view(['GET','POST'])
def View_questions(request):
    # GET
    if request.method == 'GET':
        
        # question = Answer.objects.all()
        # serializer = AnswerSerializer(question, many=True)

        question = Question.objects.all()
        serializer = QuestionSerializer(question, many=True)
        return Response(serializer.data)
        authentication_classes = [TokenAuthentication]
        permission_classes = [IsAuthenticated]

    # POST
    elif request.method == 'POST':
        serializer = QuestionSerializer(data= request.data)
        if serializer.is_valid():
            instance=serializer.save()
            instance.set_password(instance.password) 
            instance.save()
            return Response(serializer.data, status= status.HTTP_201_CREATED)
        return Response(serializer.data, status= status.HTTP_400_BAD_REQUEST)
     


# @api_view(['GET','POST'])
# def register_view(request):
#     if request.method == 'GET':

#         useres= User.objects.all()
#         serializer = RegisterSerializer(useres, many=TRUE)
#         return Response(serializer.data)
#         authentication_classes = [TokenAuthentication]
#         permission_classes = [IsAuthenticated]
#     elif request.method == 'POST':

#         serializer = RegisterSerializer(data= request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status= status.HTTP_201_CREATED)
#         return Response(serializer.data, status= status.HTTP_400_BAD_REQUEST)
#         authentication_classes = [TokenAuthentication]
#         permission_classes = [IsAuthenticated]

@api_view(['GET','PUT','DELETE'])
def View_question(request, question_id):
    try:
        question = Question.objects.get(pk=question_id)
    except Question.DoesNotExists:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # GET
    if request.method == 'GET':
        serializer = QuestionSerializer(question)
        return Response(serializer.data)
        authentication_classes = [TokenAuthentication]


def question_list(request):
    query = request.GET.get("q", None)
    questions= Question.objects.all()
    print(questions.last())
    if query is not None:
        questions = questions.filter(Q(title__icontains=query))

    
    
    # question = Question.objects.get.first().answer.first()

    return render(request, "quiz/quiz.html", {
        'questions':questions
    })

def question_v(request,question_id):
    question= Question.objects.get(id=question_id)
    answer_form=AnswerForm()
    answers=question.answer.all()
    print(answers)

    return render(request, "quiz/question.html", {
        'question':question,
        'answers':answers,
        'answer_form':answer_form
    })






def new_question(request):
    question_form= QuestionForm()
    answer_form=AnswerForm()
    
    #  modelform_factory(Answer, fields=('answer_text','is_right'))
    # AnswerForm()
   
    if request.method == "POST":
        question_f= QuestionForm(request.POST)
        answer_f= AnswerForm(request.POST)
        # answer_f1= AnswerForm(request.POST)
        # answer_f=answer_form(request.POST)
     
        if question_f.is_valid() and answer_f.is_valid():
            question=question_f.save()
            answer=answer_f.save(commit=False)
            answer.question=question
            question_f.save()
            answer_f.save()

    return render(request, "quiz/new_question.html",{
        "question_form":question_form,
        "answer_form":answer_form,
        
        

    })


        



def add_answer(request,question_id):
    question= Question.objects.get(id=question_id)
    answer_form=AnswerForm()
    if request.method=="POST":
        answer_f=AnswerForm(request.POST)
        if answer_f.is_valid():
            answer=answer_f.save(commit=False)
            answer.question=question
            answer_f.save()

    return render(request, "quiz/question.html", {
        'question':question,
        
        'answer_form':answer_form
    })


def update_answer(request, answer_id):
    answer=Answer.objects.get(id=answer_id)
    question=answer.question
    print("_______", question)

    answer_form=AnswerForm(instance=answer)
    if request.method=="POST":
        answer_form=AnswerForm(request.POST,instance=answer)
        if answer_form.is_valid():
            answer_form.save()
            return redirect('question_v', question.id)

    return render(request, "quiz/editA.html", {
        
        'answer_id':answer.id,
        'answer_form':answer_form
    })



def update_question(request, question_id):
    question=Question.objects.get(id=question_id)
    
    print("_______", question)

    question_form=QuestionForm(instance=question)
    if request.method=="POST":
        question_form=QuestionForm(request.POST,instance=question)
        if question_form.is_valid():
            question_form.save()
            return redirect('question_v', question.id)

    return render(request, "quiz/editQ.html", {
        
        'question_id':question.id,
        'question_form':question_form
    })


def delete_answer(request, answer_id):
    answer=Answer.objects.get(id=answer_id)
    question=answer.question
    answer.delete()
    return redirect('question_v', question.id)

    # return render(request, "quiz/question.html", {
    #      'question':question,
        
    #     'answer_form':AnswerForm()
    # })


def category(request,c_name):
    questions= Question.objects.filter(category=c_name)
    return render(request, "quiz/quiz.html", {
        'questions':questions
    })




def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("question_list"))
        else:
            return render(request, "quiz/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "quiz/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("question_list"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "quiz/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:

            user = User(
            email=email,
            username=username
        )
            user.set_password(password)
            user.save()
        
            
            # user = User.objects.create_user(username, email, make_password(password))
            # user.save()
        except IntegrityError:
            return render(request, "quiz/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("question_list"))
    else:
        return render(request, "quiz/register.html")
















# def correct(request,question_id):
#     question= Question.objects.get(id=question_id)
#     answers= Question.objects.get(id=question_id).answer.all()
#     # answer= Answer.objects.get(id=question_id)
#     # print(answer)
#     # a= not answer.is_right
#     a=True
#     if a in answers:
#         a= False

#     return render(request, "quiz/question.html", {
#         "question": question,
        
#         'a':a
#     })


# def new_question(request):
#     question_form= QuestionForm()
#     # answer_form=AnswerForm()
#     if request.method == "POST":
#         question_f = QuestionForm(request.POST) 
#         if question_f.is_valid():
#         # and answer_f.is_valid():
#             # title =request.POST["title"]
#         #    answer_instance= question_f.save()
           
#         #    if answer_.is_valid():
#         #        answer_.save()
#             # question=get_object_or_404(Question,title=title)
#             # print ("r:________",question)
#             # answer_f.question=question
#             # answer_form.save()
#             question_f.save()

#     return render(request, "quiz/new_question.html",{
#         "question_form":question_form,
#         # "answer_form":answer_form

#     })



# def new_question(request):
#     question_form= QuestionForm()
#     # answer_form=AnswerForm()
#     if request.method == "POST":
#         question_f=QuestionForm(request.POST)
#         if question_f.is_valid():
#             question_f.save()
#         # if question_f.is_valid():
#         #         title = question_f.cleaned_data.get["title"]
#         #         points = question_f.cleaned_data.get["points"]
#         #         question=Question(title=title,points=points)
#         #         question.save
#         #         print(question)
#         # question_f = QuestionForm(request.POST) 
#         # if question_f.is_valid():
#             # question_f.save()

#     return render(request, "quiz/new_question.html",{
#         "question_form":question_form,
#         # "answer_form":answer_form

#     })







