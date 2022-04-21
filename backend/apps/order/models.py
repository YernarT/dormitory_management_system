from django.db import models
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_delete

from os import remove


class Rent(models.Model):
    '''房租价格'''
    bed = models.ForeignKey('dorm.Bed', on_delete=models.CASCADE,
                            verbose_name='Төсек орын')
    price = models.PositiveIntegerField(verbose_name='Баға')
    DURATION_CHOICES = (
        ('hour', 'Сағат'),
        ('day', 'Күн'),
        ('month', 'Ай'),
        ('year', 'Жыл'),
    )
    duration = models.CharField(
        max_length=10, choices=DURATION_CHOICES, verbose_name='Мерзім түрі')

    class Meta:
        db_table = 'rent'
        verbose_name = 'Төлем ақы'
        verbose_name_plural = 'Төлем ақылар'

    def __str__(self):
        if self.bed.name:
            return f'{self.duration} / {self.price} - {self.bed.name}'

        return f'{self.duration} / {self.price}'


class Request(models.Model):
    '''入住请求'''
    tenant = models.ForeignKey(
        'user.User', on_delete=models.CASCADE, verbose_name='Жалға алушы')
    idn = models.CharField(max_length=12, verbose_name='ИИН нөмер')
    supplementary_description = models.CharField(
        max_length=512, verbose_name='Қосымша ақпарат')
    create_time = models.DateTimeField(
        auto_now_add=True, verbose_name='Жіберілген уақыт')

    class Meta:
        db_table = 'request'
        verbose_name = 'Өтініш'
        verbose_name_plural = 'Өтінішдер'

    def __str__(self):
        return f'{self.tenant.fullname}({self.idn})'


class RequestAppendix(models.Model):
    '''入住请求附件'''
    request = models.ForeignKey(
        Request, on_delete=models.CASCADE, verbose_name='Өтініш')
    file = models.FileField(
        upload_to='img/order/request_appendix_file/', verbose_name='Қосымша құжат')

    class Meta:
        db_table = 'request_appendix'
        verbose_name = 'Өтінішдің қосымша құжаты'
        verbose_name_plural = 'Өтінішдің қосымша құжаттары'

    def __str__(self):
        return self.request.idn


@receiver(post_delete, sender=RequestAppendix)
def request_appendix_post_delete(instance, **kwargs):
    remove(settings.MEDIA_ROOT + '/' + str(instance.file))


class Order(models.Model):
    '''订单'''
    order_no = models.CharField(max_length=40, verbose_name='Тапсырыс нөмері')
    request = models.ForeignKey(
        Request, on_delete=models.CASCADE, verbose_name='Өтініш')
    rent = models.ForeignKey(
        Rent, on_delete=models.CASCADE, verbose_name='Төлем ақы түрі')
    rent_count = models.PositiveSmallIntegerField(verbose_name='Төлем жиілігі')
    status = models.BooleanField(default=False, verbose_name='Өтініш күйі')
    create_time = models.DateTimeField(
        auto_now_add=True, verbose_name='Құрылған уақыт')

    class Meta:
        db_table = 'order'
        verbose_name = 'Тапсырыс'
        verbose_name_plural = 'Тапсырысдар'

    def __str__(self):
        return self.order_no
