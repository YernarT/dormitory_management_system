# Generated by Django 3.2.8 on 2022-04-21 04:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0003_auto_20220420_2225'),
    ]

    operations = [
        migrations.AlterField(
            model_name='requestappendix',
            name='file',
            field=models.FileField(upload_to='img/order/request_appendix_file/', verbose_name='Қосымша құжат'),
        ),
    ]