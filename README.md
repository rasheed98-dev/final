# CS50 WEB PROGRAMMING FINAL PROJECT: COMPETITIONS WEP
<!-- The project video is: https://youtu.be/YtHHEC-bdqA -->

## Main idea
I created a competitions web application to create and take quizzes in several categories and make a competition between more than one team.
And in the end the team who have highest score wins.

The main components in front-end are:


* Home page
* Login/Logout
* The categories page in which there are listed all of the different categories and where you can filter questions by different categories
* The questions page in which there are listed questions
* The question page in which there are question title and all answers 
* The score page which displays all teams sorted by score and show the winner

The main components in back-end are:
* Dashboard which the admin can add or edit questions and add answers for each question
* Login/Logout/Register

## Distinctiveness and Complexity
The page is not similar to anything we have already created. It's not a social media app nor an e-commerce. It's not similar to other years projects either.

In terms of complexity, The app devided in to two parts
back-end and front end.
In back-end i used Djando for create the dashboard and
Django REST framework to create the end-points.
In front-end i used Reactjs where i developed the web as Single-page application.

## Files information

* In back-end folder there is quiz app where contains views.py there is all of the backend code. The main functions are:
   * View_questions function the end point that return all questions
   * View_question function the end point that return details for each question
   * question_list function to list all questions in home page in the dashboard
   * question_v function to display the question in details
   * new_question function to create new question
   * update_question function to edit specific question
   * add_answer function to add new answer 
   * update_answer function to edit the answer
   * delete_answer function to delete the answer
   * category function to filter the questions by the category
   * login_view for login
   * logout_view for logout
   * register for register

* In back-end folder there is quiz app where contains Models.py. The different models are:
  * A users model
  * Question model for questions 
  * Answer model
  * TokenCreate to generate the tokens
 * In In back-end folder there is quiz app where contains:
   * serializers.py that contain all serializers
   * urls.py that contain all paths
   * form.py that contain all forms
   * Templates for all of the different html pages explained above ( including a include folder which contain the header  sidebar and footer, In layout folder in which there are base)
   *  Other less important files like urls, admin, settings, static images demo...

* Front-end folder contains:-
  * App.js which the main file where contains teams names and scores and all components
  * Components folder which contains all components such as timer auth form navbar
  * Pages folder which contains:
     * Auth.jsx the page contain login form
     * category.jsx the page that list all categories and filter question by the category
     * creat-teams.jsx the page that generate the number of teams according to the number that enterd by admin 
     * question.jsx the page that list all questions
     * questionDet.jsx the page that display question and all answers
     * showScore.jsx page which displays all teams sorted by score and show the winner
  * Context folder which store all data that comes from back-end

## How to run the application
* In back-end:
   * Install project dependencies by running pip install -r requirements.txt
  * Make and apply migrations by running python manage.py makemigrations and python manage.py migrate.
* In front-end:
  * Install project dependencies by running npm install