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
    gender = models.BooleanField(verbose_name='Жыныс')
    role = models.CharField(
        max_length=25, choices=ROLE_CHOICES, verbose_name='Рөл')
    create_time = models.DateTimeField(
        auto_now_add=True, verbose_name='Тіркелген уақыт')

    class Meta:
        db_table = 'user'
        verbose_name = 'Пайдаланушы'
        verbose_name_plural = 'Пайдаланушылар'

    def __str__(self):
        return self.fullname


class Feedback(models.Model):
    content = models.CharField(max_length=254, verbose_name='Мазмұны')
    sender = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, verbose_name='Жіберуші')
    create_time = models.DateTimeField(
        auto_now_add=True, verbose_name='Жіберілген уақыт')

    class Meta:
        db_table = 'user_feedback'
        verbose_name = 'Пайдаланушының кері байланысы'
        verbose_name_plural = 'Пайдаланушылардың кері байланыстары'

    def __str__(self):
        if self.sender:
            return self.sender.fullname
        return 'Жойылған пайдаланушы'
