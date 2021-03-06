# Generated by Django 2.2.3 on 2020-09-14 17:18

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('zdrowadieta', '0015_meal_calories'),
    ]

    operations = [
        migrations.RenameField(
            model_name='recipeingredient',
            old_name='weight',
            new_name='massFraction',
        ),
        migrations.AddField(
            model_name='meal',
            name='date',
            field=models.DateField(default=datetime.date.today, verbose_name='Name'),
        ),
        migrations.AddField(
            model_name='recipe',
            name='type',
            field=models.CharField(default='', max_length=255, verbose_name='Name'),
        ),
    ]
