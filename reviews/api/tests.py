from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status

from django.contrib.auth.models import User
from .models import Restaurant, TypeOfCuisine, Visit
from .serializers import RestaurantSerializer, VisitSerializer, TypeOfCuisineSerializer

class RestaurantsAPITestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create(username="admin", password="123admin456")
        self.cuisine = TypeOfCuisine.objects.create(name="Ukrainian")
        self.restaurant = Restaurant.objects.create(title="Veranda", address="Vaclavske Namesti 74", type_of_cuisine=self.cuisine, creator=self.user)
        self.url = '/api/restaurants/'

    def test_get_restaurants_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_restaurant_with_data(self):
        data = {
            "title": "KFC",
            "address": "Novodvorska 865",
            "type_of_cuisine": 1,
            "creator": 1
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_post_restaurant_without_data(self):
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_created_restaurant(self):
        data = {
            "title": "KFC",
            "address": "Novodvorska 865",
            "type_of_cuisine": 1,
            "creator": 1
        }
        response = self.client.post(self.url, data)
        response_json = response.json()
        restaurant_name = response_json['title']

        updated_data = {
            "title": "Kentuky Fried Chicken",
            "address": "Novodvorska 865",
            "type_of_cuisine": 1,
            "creator": 1
        }
        response = self.client.put(f"{self.url}{restaurant_name}/", updated_data)
        self.assertEqual(response.status_code, status.HTTP_205_RESET_CONTENT)
