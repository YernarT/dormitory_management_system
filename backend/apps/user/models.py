from django.db import models
from django.dispatch import receiver
from django.db.models.signals import pre_save
from django.contrib.auth.hashers import make_password


class User(models.Model):
    email = models.EmailField(unique=True, verbose_name='Email')
    fullname = models.CharField(max_length=42, verbose_name='Аты жөн')
    password = models.CharField(max_length=254, verbose_name='Құпия сөз')
    ROLE_CHOICES = (
        (1, 'Сайт әкімшісі'),
        (2, 'Жатақхана меңгеруші'),
        (3, 'Тұрғыншы'),
    )
    role = models.PositiveSmallIntegerField(
        choices=ROLE_CHOICES, default=3, verbose_name='Рөл')
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
    if not instance.password.startswith('pbkdf2_sha256$'):
        instance.password = make_password(instance.password)
