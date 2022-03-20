from rest_framework.routers import DefaultRouter

from user.views import UserView


# 创建路由器
router = DefaultRouter()
# 注册路由
router.register(r'users', UserView)

urlpatterns = router.urls
