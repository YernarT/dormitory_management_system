from django.conf.urls import url
from user.views import LoginView, RegisterView, EditView, ChangePasswordView, NotificationView, NotificationSingleView


urlpatterns = [
    url(r'^user/login/$', LoginView.as_view()),
    url(r'^user/register/$', RegisterView.as_view()),

    url(r'^user/edit/$', EditView.as_view()),
    url(r'^user/change_password/$', ChangePasswordView.as_view()),

    url(r'^user/notification/$', NotificationView.as_view()),
    url(r'^user/notification/(?P<id>\d+)/$', NotificationSingleView.as_view()),
]

app_name = 'user'
