from rest_framework.viewsets import ModelViewSet

from user.models import User
from user.serializers import UserSerializer


class UserView(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
