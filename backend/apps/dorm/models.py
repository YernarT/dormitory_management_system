from django.db import models
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_delete

from os import remove


class City(models.Model):
    '''城市'''
    name = models.CharField(max_length=40, unique=True,
                            verbose_name='Қала атуы')

    class Meta:
        db_table = 'city'
        verbose_name = 'Қала'
        verbose_name_plural = 'Қалалар'

    def __str__(self):
        return self.name


class Organization(models.Model):
    '''机构'''
    name = models.CharField(max_length=40, verbose_name='Ұйым атуы')
    CATEGORY_CHOICES = (
        ('university', 'Университет'),
        ('college', 'Колледж'),
        ('school', 'Мектеп'),
        ('other', 'Басқа'),
    )
    category = models.CharField(
        max_length=10, choices=CATEGORY_CHOICES, verbose_name='Санат')
    creator = models.ForeignKey(
        'user.User', on_delete=models.CASCADE, verbose_name='Құрушы')
    create_time = models.DateTimeField(
        auto_now_add=True, verbose_name='Құрылған уақыт')

    class Meta:
        db_table = 'organization'
        verbose_name = 'Ұйым'
        verbose_name_plural = 'Ұйымдар'

    def __str__(self):
        return f'{self.name} ({self.category})'


class Dorm(models.Model):
    '''宿舍'''
    name = models.CharField(max_length=40, verbose_name='Жатақхана атуы')
    description = models.CharField(
        max_length=254, null=True, blank=True, verbose_name='Сипаттама')
    city = models.ForeignKey(
        City, on_delete=models.SET_NULL, null=True, verbose_name='Орналасқан қала')
    address = models.CharField(
        max_length=60, verbose_name='Жатақхана нақты мекен-жайы')
    organization = models.ForeignKey(
        Organization, on_delete=models.CASCADE, verbose_name='Ұйым')
    create_time = models.DateTimeField(
        auto_now_add=True, verbose_name='Құрылған уақыт')

    class Meta:
        db_table = 'dorm'
        verbose_name = 'Жатақхана'
        verbose_name_plural = 'Жатақханалар'

    def __str__(self):
        if self.city:
            return f'{self.city}, {self.name}'

        return f'Жойылған қала, {self.name}'


class DormImage(models.Model):
    '''宿舍图片'''
    image = models.ImageField(upload_to='img/dorm/dorm_image/')
    dorm = models.ForeignKey(
        Dorm, on_delete=models.CASCADE, verbose_name='Жатақхана')

    class Meta:
        db_table = 'dorm_image'
        verbose_name = 'Жатақхана суреті'
        verbose_name_plural = 'Жатақхана суреттері'

    def __str__(self):
        return f'{self.dorm.name} суреті'


@receiver(post_delete, sender=DormImage)
def dorm_image_post_delete(instance, **kwargs):
    remove(settings.MEDIA_ROOT + '/' + str(instance.image))


class Room(models.Model):
    '''房间'''
    name = models.CharField(max_length=24, verbose_name='Бөлме атауы')
    # 楼层
    floor = models.PositiveSmallIntegerField(verbose_name='Қабат нөмері')
    description = models.CharField(
        max_length=254, null=True, blank=True, verbose_name='Сипаттама')
    dorm = models.ForeignKey(
        Dorm, on_delete=models.CASCADE, verbose_name='Жатақхана')
    create_time = models.DateTimeField(
        auto_now_add=True, verbose_name='Құрылған уақыт')

    class Meta:
        db_table = 'room'
        verbose_name = 'Бөлме'
        verbose_name_plural = 'Бөлмелер'

    def __str__(self):
        return f'{self.dorm.name}, {self.name}'


class RoomImage(models.Model):
    '''房间图片'''
    image = models.ImageField(upload_to='img/dorm/room_image/')
    room = models.ForeignKey(
        Room, on_delete=models.CASCADE, verbose_name='Бөлме')

    class Meta:
        db_table = 'room_image'
        verbose_name = 'Бөлме суреті'
        verbose_name_plural = 'Бөлме суреттері'

    def __str__(self):
        return f'{self.room.name} суреті'


@receiver(post_delete, sender=RoomImage)
def room_image_post_delete(instance, **kwargs):
    remove(settings.MEDIA_ROOT + '/' + str(instance.image))


class Bed(models.Model):
    '''床位 (住处)'''
    name = models.CharField(max_length=24, null=True,
                            blank=True, verbose_name='Төсек орын атауы')
    description = models.CharField(
        max_length=254, null=True, blank=True, verbose_name='Сипаттама')
    owner = models.ForeignKey('user.User', on_delete=models.SET_NULL,
                              null=True, blank=True, default=None, verbose_name='Иесі (Пайдаланушы)')
    room = models.ForeignKey(
        Room, on_delete=models.CASCADE, verbose_name='Бөлме')
    create_time = models.DateTimeField(
        auto_now_add=True, verbose_name='Құрылған уақыт')

    class Meta:
        db_table = 'bed'
        verbose_name = 'Төсек орын'
        verbose_name_plural = 'Төсек орындар'

    def __str__(self):
        if self.owner:
            if self.name:
                return f'{self.owner} {self.name}'
            return f'Төсек орын, иесі {self.owner.fullname}'
        else:
            if self.name:
                return f'Бос орын: {self.name}'
            return 'Бос орын'


class BedImage(models.Model):
    '''床位图片'''
    image = models.ImageField(upload_to='img/dorm/bed_image/')
    bed = models.ForeignKey(
        Bed, on_delete=models.CASCADE, verbose_name='Төсек орын')

    class Meta:
        db_table = 'bed_image'
        verbose_name = 'Төсек орын суреті'
        verbose_name_plural = 'Төсек орын суреттері'

    def __str__(self):
        if self.bed.name:
            return f'{self.bed.name} суреті'

        return f'Төсек орын суреті'


@receiver(post_delete, sender=BedImage)
def bed_image_post_delete(instance, **kwargs):
    remove(settings.MEDIA_ROOT + '/' + str(instance.image))
