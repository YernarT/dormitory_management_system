# Generated by Django 3.2.8 on 2022-03-23 10:56

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='Email')),
                ('fullname', models.CharField(default='u_2022032316', max_length=50, verbose_name='Аты жөн')),
                ('password', models.CharField(max_length=254, verbose_name='Құпия сөз')),
                ('role', models.CharField(choices=[('site admin', 'Сайт әкімшісі'), ('dorm manager', 'Жатақхана меңгеруші'), ('tenant', 'Жалға алушы')], max_length=25, verbose_name='рөл')),
                ('create_time', models.DateTimeField(auto_now_add=True, verbose_name='уақыт')),
            ],
            options={
                'verbose_name': 'Пайдаланушы',
                'verbose_name_plural': 'Пайдаланушылар',
                'db_table': 'user',
            },
        ),
    ]
