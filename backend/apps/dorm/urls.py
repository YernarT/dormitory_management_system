from django.conf.urls import url
from dorm.views import CityView, CitySingleView


urlpatterns = [
    url(r'^dorm/city/$', CityView.as_view()),
    url(r'^dorm/city/(?P<id>\d+)/$', CitySingleView.as_view()),
]

app_name = 'dorm'
