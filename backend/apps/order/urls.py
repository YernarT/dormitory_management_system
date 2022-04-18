from django.conf.urls import url
from order.views import RequestView


urlpatterns = [
    url(r'^order/request/$', RequestView.as_view()),
    # url(r'^order/request/(?P<id>\d+)/$', RequestSingleView.as_view()),

]

app_name = 'order'
