from django.conf.urls import url
from user.views import LoginView, RegisterView

urlpatterns = [
    url(r'^user/login/$', LoginView.as_view()),
    url(r'^user/register/$', RegisterView.as_view()),


    # url(r'^edit/$', EditView.as_view()),
    # url(r'^edit/avatar/$', EditAvatarView.as_view()),
]

app_name = 'user'
