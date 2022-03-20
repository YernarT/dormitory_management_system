from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from user.models import User


class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(label='ID', read_only=True)
    email = serializers.EmailField(label='Email',
                                   max_length=254,
                                   validators=[UniqueValidator(
                                         queryset=User.objects.all())],
                                   error_messages={'required': 'Email қажет'})
    fullname = serializers.CharField(
        label='Аты-жөн', min_length=1, max_length=50)
    password = serializers.CharField(
        label='Құпия сөз', min_length=1, max_length=100, write_only=True)
    role = serializers.CharField(label='Рөл', min_length=1, max_length=25)
    create_time = serializers.DateTimeField(
        label='Тіркелу уақыт', read_only=True)

    class Meta:
        model = User
        fields = '__all__'
