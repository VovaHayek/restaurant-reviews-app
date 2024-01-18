from django.urls import path

from . import views

urlpatterns = [
    path('account/', views.AccountInformation.as_view()),
    path('logout/', views.LogoutView.as_view()),
    path('registration/', views.RegistrationView.as_view()),
]