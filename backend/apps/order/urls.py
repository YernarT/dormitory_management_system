from django.conf.urls import url
from order.views import OrderView, RequestView


urlpatterns = [
    url(r'^order/$', OrderView.as_view()),
    
    url(r'^order/request/$', RequestView.as_view()),
    # url(r'^order/request/(?P<id>\d+)/$', RequestSingleView.as_view()),
    

]

app_name = 'order'
