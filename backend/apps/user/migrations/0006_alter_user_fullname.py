# Generated by Django 3.2.8 on 2022-04-11 03:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0005_alter_user_fullname'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='fullname',
            field=models.CharField(default='u_2022041109', max_length=50, verbose_name='Аты жөн'),
        ),
    ]
