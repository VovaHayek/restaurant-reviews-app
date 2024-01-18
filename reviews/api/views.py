from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Restaurant, Visit, TypeOfCuisine
from .serializers import RestaurantSerializer, VisitSerializer, TypeOfCuisineSerializer

class RestaurantsList(APIView):
    def get(self, request):
        restaurants = Restaurant.objects.all().order_by('-id')
        serializer = RestaurantSerializer(restaurants, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = RestaurantSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class RestaurantDetail(APIView):
    def get(self, request, restaurant_name):
        restaurant = Restaurant.objects.get(title=restaurant_name)
        serializer = RestaurantSerializer(restaurant, many=False)
        return Response(serializer.data)

    def put(self, request, restaurant_name):
        restaurant = Restaurant.objects.get(title=restaurant_name)
        serializer = RestaurantSerializer(restaurant, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, restaurant_name):
        restaurant = Restaurant.objects.get(title=restaurant_name)
        restaurant.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
class VisitsList(APIView):
    def get(self, request, restaurant_name):
        visits = Visit.objects.filter(restaurant__title=restaurant_name).order_by('date')
        serializer = VisitSerializer(visits, many=True)
        return Response(serializer.data)
    
    def post(self, request, restaurant_name):
        serializer = VisitSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TypeOfCuisineList(APIView):
    def get(self, request):
        cuisine = TypeOfCuisine.objects.all()
        serializer = TypeOfCuisineSerializer(cuisine, many=True)
        return Response(serializer.data)
