# Generated by Django 3.2.8 on 2022-04-08 21:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_auto_20220407_1220'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='fullname',
            field=models.CharField(default='u_2022040903', max_length=50, verbose_name='Аты жөн'),
        ),
    ]
