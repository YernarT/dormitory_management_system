from django.db import models

class Dorm(models.Model):

    class Meta:
        db_table = 'dorm'
        verbose_name = 'Жатақхана'
        verbose_name_plural = 'Жатақханалар'

    def __str__(self):
        pass
        # return self.email

