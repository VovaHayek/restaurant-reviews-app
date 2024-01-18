# Generated by Django 5.0.1 on 2024-01-16 21:56

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_restaurant_creator'),
    ]

    operations = [
        migrations.AlterField(
            model_name='visit',
            name='restaurant',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='visits', to='api.restaurant'),
        ),
    ]