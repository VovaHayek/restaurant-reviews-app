from django.contrib import admin

from .models import Restaurant, Visit, TypeOfCuisine

admin.site.register(Restaurant)
admin.site.register(TypeOfCuisine)
admin.site.register(Visit)
