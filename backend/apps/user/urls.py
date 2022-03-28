from django.conf.urls import url
from user.views import LoginView, RegisterView, EditView, ChangePasswordView, FeedbackView


urlpatterns = [
    url(r'^user/login/$', LoginView.as_view()),
    url(r'^user/register/$', RegisterView.as_view()),

    url(r'^user/edit/$', EditView.as_view()),
    url(r'^user/change_password/$', ChangePasswordView.as_view()),
    
    url(r'^user/feedback/$', FeedbackView.as_view()),
]

app_name = 'user'
