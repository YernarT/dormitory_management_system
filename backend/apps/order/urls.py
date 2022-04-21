from django.conf.urls import url
from order.views import OrderView, RequestView, RequestSingleView, StatisticView


urlpatterns = [
    url(r'^order/$', OrderView.as_view()),

    url(r'^order/request/$', RequestView.as_view()),
    url(r'^order/request/(?P<id>\d+)/$', RequestSingleView.as_view()),

    url(r'^order/statistic/$', StatisticView.as_view()),


]

app_name = 'order'
