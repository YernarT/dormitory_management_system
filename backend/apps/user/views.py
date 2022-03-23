from django.http import JsonResponse
from django.views.generic import View
from django.contrib.auth.hashers import check_password, make_password


from user.models import User
from user.verify import verify_register, verify_login

from utils.auth import generate_token
from utils.data import get_data, serializer_data


class LoginView(View):

    def post(self, request):
        data = get_data(request)

        is_valid, response = verify_login(data)
        if not is_valid:
            return response

        try:
            user = User.objects.get(email=data.get('email'))
        except User.DoesNotExist:
            return JsonResponse({'message': 'авторизация сәтсіз болды'}, status=400)

        if check_password(data['password'], user.password):
            return JsonResponse({'message': 'авторизация сәтті болды',
                                 'token': generate_token(user.id),
                                 'user': serializer_data(user, False)
                                 }, status=200)

        return JsonResponse({'message': 'авторизация сәтсіз болды'}, status=400)


class RegisterView(View):

    def post(self, request):
        data = get_data(request)

        is_valid, response = verify_register(data)
        if not is_valid:
            return response

        # TODO: 校验权限
        # data.get('role') == 'site admin'

        try:
            have_same_email_user = User.objects.get(email=data.get('email'))
        except User.DoesNotExist:
            have_same_email_user = False

        if have_same_email_user:
            return JsonResponse({'message': 'Email тіркелген'}, status=400)

        data['password'] = make_password(data['password'])
        new_user = User.objects.create(**data)

        return JsonResponse({'message': 'тіркелу сәтті болды',
                             'token': generate_token(new_user.id),
                             'user': serializer_data(new_user, False)
                             }, status=201)
