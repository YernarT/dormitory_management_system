from django.contrib import admin

from dorm.models import City, Dorm, DormImage, Room, RoomImage, Bed, BedImage, Organization

admin.site.register(City)

admin.site.register(Dorm)

admin.site.register(DormImage)

admin.site.register(Room)

admin.site.register(RoomImage)

admin.site.register(Bed)

admin.site.register(BedImage)

admin.site.register(Organization)
