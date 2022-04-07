from django.contrib import admin

from order.models import Rent, Request, RequestAppendix, Order

admin.site.register(Rent)

admin.site.register(Request)

admin.site.register(RequestAppendix)

admin.site.register(Order)
