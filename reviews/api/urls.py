from django.urls import path

from . import views

urlpatterns = [
    path('restaurants/', views.RestaurantsList.as_view()),
    path('restaurants/<str:restaurant_name>/', views.RestaurantDetail.as_view()),
    path('visits/<str:restaurant_name>/', views.VisitsList.as_view()),
    path('type-of-cuisine/', views.TypeOfCuisineList.as_view()),
]