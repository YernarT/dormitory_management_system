from django.db import models


class Notification(models.Model):
    content = models.CharField(max_length=254, verbose_name='Мазмұны')
    sender = models.ForeignKey('user.User', on_delete=models.SET_NULL,
                               null=True, related_name='sender', verbose_name='Жіберуші')
    recipient = models.ForeignKey('user.User', on_delete=models.CASCADE,
                                  related_name='recipient', verbose_name='Қабылдаушы')
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
