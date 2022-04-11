from django.conf.urls import url
from dorm.views import CityView, CitySingleView, DormView, OrganizationView, OrganizationCategoryView, DormManagerView


urlpatterns = [
    url(r'^dorm/city/$', CityView.as_view()),
    url(r'^dorm/city/(?P<id>\d+)/$', CitySingleView.as_view()),

    url(r'^dorm/$', DormView.as_view()),
    # url(r'^dorm/(?P<id>\d+)/$', DormSingleView.as_view()),

    url(r'^dorm/organization/$', OrganizationView.as_view()),
    url(r'^dorm/organization/category/$', OrganizationCategoryView.as_view()),

    url(r'^dorm/dorm_manager/$', DormManagerView.as_view()),
]

app_name = 'dorm'
