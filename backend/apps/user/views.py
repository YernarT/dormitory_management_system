from django.http import JsonResponse
from django.views.generic import View
from django.contrib.auth.hashers import check_password, make_password


from user.models import User, Feedback
from user.verify import verify_register, verify_login, verify_edit, verify_change_password, verify_post_feedback

from utils.auth import generate_token, verify_token
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
                                 'user': serializer_data(user, {'is_multiple': False, 'exclude_fields': ['password']})
                                 }, status=200)

        return JsonResponse({'message': 'авторизация сәтсіз болды'}, status=400)


class RegisterView(View):

    def post(self, request):
        data = get_data(request)

        is_valid, response = verify_register(data)
        if not is_valid:
            return response

        # 校验权限
        if data.get('role') == 'site admin':
            is_valid, user_or_response_content = verify_token(request)
            if not is_valid:
                return JsonResponse(user_or_response_content, status=401)
            if user_or_response_content.role != 'site admin':
                return JsonResponse({'message': 'site admin рөлін тек site admin рөлді пайдаланушы құра алады'}, status=401)

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
                             'user': serializer_data(new_user, {'is_multiple': False, 'exclude_fields': ['password']})
                             }, status=201)


class EditView(View):

    def put(self, request):
        is_valid, user_or_response_content = verify_token(request)
        if not is_valid:
            return JsonResponse(user_or_response_content, status=401)

        data = get_data(request)

        is_valid, response = verify_edit(data)
        if not is_valid:
            return response

        try:
            have_same_email_user = User.objects.get(email=data.get('email'))
        except User.DoesNotExist:
            have_same_email_user = False

        if have_same_email_user:
            return JsonResponse({'message': 'Email тіркелген'}, status=400)

        data_fields = [('email', data.get('email')),
                       ('fullname', data.get('fullname')),
                       ('gender', data.get('gender'))]
        for field_name, field_value in data_fields:
            if field_value != None:
                user_or_response_content.__setattr__(field_name, field_value)
        else:
            user_or_response_content.save()

        return JsonResponse({'message': 'өзгерту сәтті болды',
                             'user': serializer_data(user_or_response_content, {'is_multiple': False, 'include_fields': ['fullname', 'email', 'gender']})
                             }, status=200)


class ChangePasswordView(View):

    def put(self, request):
        is_valid, user_or_response_content = verify_token(request)
        if not is_valid:
            return JsonResponse(user_or_response_content, status=401)

        data = get_data(request)

        is_valid, response = verify_change_password(data)
        if not is_valid:
            return response

        if check_password(data['oldPassword'], user_or_response_content.password):
            user_or_response_content.password = make_password(
                data['newPassword'])
            user_or_response_content.save()

            return JsonResponse({'message': 'Құпия сөз сәтті өзгертілді'}, status=200)

        return JsonResponse({'message': 'Ескі құпия сөз қате'}, status=400)


class FeedbackView(View):

    def get(self, request):
        pass

    def post(self, request):
        is_valid, user_or_response_content = verify_token(request)
        if not is_valid:
            return JsonResponse(user_or_response_content, status=401)

        data = get_data(request)

        is_valid, response = verify_post_feedback(data)
        if not is_valid:
            return response

        Feedback.objects.create(
            sender=user_or_response_content, **data)

        return JsonResponse({'message': 'Пікір сәтті жіберілді'}, status=201)
