from rest_framework.serializers import ModelSerializer, SerializerMethodField
from django.db.models import Avg, Sum
from django.db.models.functions import Round
from drf_writable_nested import WritableNestedModelSerializer

from .models import Restaurant, Visit, TypeOfCuisine

class TypeOfCuisineSerializer(ModelSerializer):
    class Meta:
        model = TypeOfCuisine
        fields = '__all__'

class RestaurantSerializer(WritableNestedModelSerializer, ModelSerializer):
    average_rating = SerializerMethodField()
    amount_spent = SerializerMethodField()

    def get_average_rating(self, restaurant):
        return restaurant.visits.all().aggregate(evaluation__avg=Round(Avg('evaluation'), 1))

    def get_amount_spent(self, restaurant):
        return restaurant.visits.all().aggregate(Sum('expence'))

    class Meta:
        model = Restaurant
        fields = ['id', 'title', 'address', 'type_of_cuisine', 'creator', 'average_rating', 'amount_spent']
        read_only_fields = ('created','updated')

    def to_representation(self, instance):
        self.fields['type_of_cuisine'] = TypeOfCuisineSerializer(many=False, read_only=True)
        return super(RestaurantSerializer, self).to_representation(instance)

class VisitSerializer(WritableNestedModelSerializer, ModelSerializer):
    class Meta:
        model = Visit
        fields = ['date', 'note', 'expence', 'evaluation', 'restaurant']
        read_only_fields = ('created','updated')

    def to_representation(self, instance):
        self.fields['restaurant'] = RestaurantSerializer(many=False, read_only=True)
        return super(VisitSerializer, self).to_representation(instance)