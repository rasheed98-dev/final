from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from . import views




urlpatterns = [
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path('', views.question_list, name="question_list"),
    # questions/
    path('new_question/', views.new_question, name="new_question"),
    path('update_answer/<int:answer_id>', views.update_answer, name="update_answer"),
     path('delete_answer/<int:answer_id>', views.delete_answer, name="delete_answer"),

    
    path('category/<str:c_name>', views.category, name="category"),
    path('questions/<int:question_id>', views.question_v, name="question_v"),
    path('questions/<int:question_id>/add_answer', views.add_answer, name="add_answer"),
    path('update_question/<int:question_id>', views.update_question, name="update_question"),
    
    
    # path('questions/<int:question_id>/toglle_ans', views.correct, name="correct"),
    # path('answer/<int:question_id>', views.correct, name="correct"),

    path('rest/question/', views.View_questions),
    path('rest/question/<int:question_id>', views.View_question),
    # path('rest/register/', views.register_view),
    path('api-token-auth', obtain_auth_token),
    
]
