# Generated by Django 3.2.8 on 2022-04-09 03:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_alter_user_fullname'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='fullname',
            field=models.CharField(default='u_2022040909', max_length=50, verbose_name='Аты жөн'),
        ),
        migrations.AlterField(
            model_name='user',
            name='role',
            field=models.CharField(choices=[('site admin', 'Сайт әкімшісі'), ('org manager', 'Ұйым меңгеруші'), ('dorm manager', 'Жатақхана меңгеруші'), ('tenant', 'Жалға алушы')], max_length=20, verbose_name='Рөл'),
        ),
    ]
