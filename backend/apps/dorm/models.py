from django.db import models


class City(models.Model):
    '''城市'''
    name = models.CharField(max_length=40, verbose_name='Қала атуы')

    class Meta:
        db_table = 'dorm_city'
        verbose_name = 'Қала'
        verbose_name_plural = 'Қалалар'

    def __str__(self):
        return self.name


class Dorm(models.Model):
    '''宿舍'''
    name = models.CharField(max_length=40, verbose_name='Жатақхана атуы')
    description = models.CharField(
        max_length=254, null=True, blank=True, verbose_name='Сипаттама')
    city = models.ForeignKey(
        City, on_delete=models.SET_NULL, null=True, verbose_name='Орналасқан қала')
    address = models.CharField(
        max_length=60, verbose_name='Жатақхана нақты мекен-жайы')

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


class Room(models.Model):
    '''房间'''
    name = models.CharField(max_length=24, verbose_name='Бөлме атауы')
    # 楼层
    floor = models.PositiveSmallIntegerField(verbose_name='Қабат нөмері')
    description = models.CharField(
        max_length=254, null=True, blank=True, verbose_name='Сипаттама')
    dorm = models.ForeignKey(
        Dorm, on_delete=models.CASCADE, verbose_name='Жатақхана')

    class Meta:
        db_table = 'dorm_room'
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
        db_table = 'dorm_room_image'
        verbose_name = 'Бөлме суреті'
        verbose_name_plural = 'Бөлме суреттері'

    def __str__(self):
        return f'{self.room.name} суреті'


class Bed(models.Model):
    '''床位 (住处)'''
    name = models.CharField(max_length=24, null=True,
                            blank=True, verbose_name='Төсек орын атауы')
    description = models.CharField(
        max_length=254, null=True, blank=True, verbose_name='Сипаттама')
    owner = models.ForeignKey('user.User', on_delete=models.SET_NULL,
                              null=True, blank=True, verbose_name='Иесі (Пайдаланушы)')
    room = models.ForeignKey(
        Room, on_delete=models.CASCADE, verbose_name='Бөлме')

    class Meta:
        db_table = 'dorm_bed'
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
    room = models.ForeignKey(
        Room, on_delete=models.CASCADE, verbose_name='Төсек орын')

    class Meta:
        db_table = 'dorm_bed_image'
        verbose_name = 'Төсек орын суреті'
        verbose_name_plural = 'Төсек орын суреттері'

    def __str__(self):
        if self.room.name:
            return f'{self.room.name} суреті'

        return f'Төсек орын суреті'


class Rent(models.Model):
    '''房租价格'''
    bed = models.ForeignKey(Bed, on_delete=models.CASCADE,
                            verbose_name='Төсек орын')
    price = models.PositiveIntegerField(verbose_name='Баға')
    DURATION_CHOICES = (
        ('hour', 'Сағат'),
        ('day', 'Күн'),
        ('month', 'Ай'),
        ('year', 'Жыл'),
    )
    duration = models.CharField(
        max_length=10, choices=DURATION_CHOICES, verbose_name='Мерзім')

    class Meta:
        db_table = 'dorm_rent'
        verbose_name = 'Төлем ақы'
        verbose_name_plural = 'Төлем ақылар'

    def __str__(self):
        if self.bed.name:
            return f'{self.duration} / {self.price} - {self.bed.name}'

        return f'{self.duration} / {self.price}'
