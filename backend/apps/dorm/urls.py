from django.conf.urls import url
from dorm.views import CityView, CitySingleView, DormView, DormSingleView, OrganizationView, OrganizationCategoryView, RoomView, RoomSingleView, BedView, BedSingleView


urlpatterns = [
    url(r'^dorm/city/$', CityView.as_view()),
    url(r'^dorm/city/(?P<id>\d+)/$', CitySingleView.as_view()),

    url(r'^dorm/$', DormView.as_view()),
    url(r'^dorm/(?P<id>\d+)/$', DormSingleView.as_view()),

    url(r'^dorm/organization/$', OrganizationView.as_view()),
    url(r'^dorm/organization/category/$', OrganizationCategoryView.as_view()),

    url(r'^dorm/room/$', RoomView.as_view()),
    url(r'^dorm/room/(?P<id>\d+)/$$', RoomSingleView.as_view()),

    url(r'^dorm/bed/$', BedView.as_view()),
    url(r'^dorm/bed/(?P<id>\d+)/$$', BedSingleView.as_view()),
]

app_name = 'dorm'
