# Generated by Django 2.2.3 on 2020-09-10 18:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('zdrowadieta', '0006_auto_20200910_2031'),
    ]

    operations = [
        migrations.CreateModel(
            name='PreferredIngredient',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='zdrowadieta.Client')),
                ('ingredient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='zdrowadieta.Ingredient')),
            ],
        ),
    ]
