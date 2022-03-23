from django.db import models
from datetime import datetime


class User(models.Model):
    email = models.EmailField(unique=True, verbose_name='Email')
    fullname = models.CharField(max_length=50,
                                default='u_' +
                                datetime.strftime(datetime.now(), '%Y%m%d%H'),
                                verbose_name='Аты жөн')
    password = models.CharField(max_length=254, verbose_name='Құпия сөз')
    ROLE_CHOICES = (
        ('site admin', 'Сайт әкімшісі'),
        ('dorm manager', 'Жатақхана меңгеруші'),
        ('tenant', 'Жалға алушы'),
    )
    role = models.CharField(
        max_length=25, choices=ROLE_CHOICES, verbose_name='рөл')
    create_time = models.DateTimeField(
        auto_now_add=True, verbose_name='уақыт')

    class Meta:
        db_table = 'user'
        verbose_name = 'Пайдаланушы'
        verbose_name_plural = 'Пайдаланушылар'

    def __str__(self):
        return self.email
