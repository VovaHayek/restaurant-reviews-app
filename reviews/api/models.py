from django.db import models
from datetime import date

from django.contrib.auth.models import User

def evaluation_choices():
    return [ (number, number) for number in range(1, 6) ]

class TypeOfCuisine(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Restaurant(models.Model):
    title = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    type_of_cuisine = models.ForeignKey(TypeOfCuisine, on_delete=models.DO_NOTHING, related_name='cuisine')
    creator = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='restaurant_creator')

    def __str__(self):
        return self.title

class Visit(models.Model):
    date = models.DateField(default=date.today)
    note = models.TextField(default='', blank=True)
    expence = models.IntegerField(default=0)
    evaluation = models.IntegerField(choices=evaluation_choices())
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='visits')

    def __str__(self):
        return self.restaurant.title