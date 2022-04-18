from django.db import models
from django.dispatch import receiver
from django.db.models.signals import pre_save
from django.contrib.auth.hashers import make_password

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
        ('org manager', 'Ұйым меңгеруші'),
        # ('dorm manager', 'Жатақхана меңгеруші'),
        ('tenant', 'Жалға алушы'),
    )
    role = models.CharField(
        max_length=20, choices=ROLE_CHOICES, verbose_name='Рөл')
    gender = models.BooleanField(verbose_name='Жыныс')
    create_time = models.DateTimeField(
        auto_now_add=True, verbose_name='Тіркелген уақыт')

    class Meta:
        db_table = 'user'
        verbose_name = 'Пайдаланушы'
        verbose_name_plural = 'Пайдаланушылар'

    def __str__(self):
        return self.fullname


@receiver(pre_save, sender=User)
def user_pre_save(instance, **kwargs):
    # pbkdf2_sha256$
    instance.password = make_password(instance.password)


class Notification(models.Model):
    content = models.CharField(max_length=254, verbose_name='Мазмұны')
    sender = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name='sender', verbose_name='Жіберуші')
    recipient = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='recipient', verbose_name='Алушы')
    create_time = models.DateTimeField(
        auto_now_add=True, verbose_name='Жіберілген уақыт')

    class Meta:
        db_table = 'notification'
        verbose_name = 'Хабарландыру'
        verbose_name_plural = 'Хабарландырулар'

    def __str__(self):
        if self.sender:
            return self.sender.fullname
        return 'Жойылған пайдаланушы'
