# Generated by Django 3.2.8 on 2022-04-03 05:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0004_auto_20220330_1050'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='fullname',
            field=models.CharField(default='u_2022040311', max_length=50, verbose_name='Аты жөн'),
        ),
    ]