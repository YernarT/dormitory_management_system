from django.contrib import admin
from django.conf.urls import url, include
from django.views.static import serve

from backend import settings

urlpatterns = [
    url('^admin/', admin.site.urls),

    # user module
    url('^api/', include('user.urls')),
    url('^api/', include('dorm.urls')),
    url('^api/', include('order.urls')),

    url(r'^media/(?P<path>.*)$', serve,
        {"document_root": settings.MEDIA_ROOT}),
]
