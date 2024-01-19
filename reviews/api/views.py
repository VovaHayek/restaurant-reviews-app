from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg.views import get_schema_view
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .models import Restaurant, Visit, TypeOfCuisine
from .serializers import RestaurantSerializer, VisitSerializer, TypeOfCuisineSerializer

class RestaurantsList(APIView):
    @swagger_auto_schema(responses={200: RestaurantSerializer(many=True)})
    def get(self, request):
        """Returns list of all restaurants"""
        restaurants = Restaurant.objects.all().order_by('-id')
        serializer = RestaurantSerializer(restaurants, many=True)
        return Response(serializer.data)
    
    @swagger_auto_schema(responses={201: RestaurantSerializer(many=False)})
    def post(self, request):
        """Creates a new restaurant in the Database **(If the form is valid)**"""
        serializer = RestaurantSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class RestaurantDetail(APIView):
    @swagger_auto_schema(responses={200: RestaurantSerializer(many=False)})
    def get(self, request, restaurant_name):
        restaurant = Restaurant.objects.get(title=restaurant_name)
        serializer = RestaurantSerializer(restaurant, many=False)
        return Response(serializer.data)

    @swagger_auto_schema(responses={205: RestaurantSerializer(many=True)})
    def put(self, request, restaurant_name):
        restaurant = Restaurant.objects.get(title=restaurant_name)
        serializer = RestaurantSerializer(restaurant, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @swagger_auto_schema(responses={204: RestaurantSerializer(many=False)})
    def delete(self, request, restaurant_name):
        restaurant = Restaurant.objects.get(title=restaurant_name)
        restaurant.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
class VisitsList(APIView):
    @swagger_auto_schema(responses={200: VisitSerializer(many=True)})
    def get(self, request, restaurant_name):
        visits = Visit.objects.filter(restaurant__title=restaurant_name).order_by('date')
        serializer = VisitSerializer(visits, many=True)
        return Response(serializer.data)
    
    @swagger_auto_schema(responses={200: VisitSerializer(many=True)})
    def post(self, request, restaurant_name):
        serializer = VisitSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TypeOfCuisineList(APIView):
    @swagger_auto_schema(responses={200: TypeOfCuisineSerializer(many=True)})
    def get(self, request):
        cuisine = TypeOfCuisine.objects.all()
        serializer = TypeOfCuisineSerializer(cuisine, many=True)
        return Response(serializer.data)
