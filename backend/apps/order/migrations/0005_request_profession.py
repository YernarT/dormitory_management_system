# Generated by Django 3.2.8 on 2022-05-02 10:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0004_alter_requestappendix_file'),
    ]

    operations = [
        migrations.AddField(
            model_name='request',
            name='profession',
            field=models.CharField(default='Ақпараттық жүйе', max_length=60, verbose_name='Мамандық атауы'),
            preserve_default=False,
        ),
    ]