from typing import Dict, Union, Tuple, Any

from django.http import JsonResponse

from user.models import User
from utils.data import verify_data, verify_dict


def verify_login(data: Dict[str, Any]) -> Union[Tuple[bool, None], Tuple[bool, JsonResponse]]:
    email = data.get('email')
    password = data.get('password')

    for is_valid, error_message in (verify_data(data=email, required=True, data_type=str, min_length=5, max_length=254, regex=r'(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)', error_messages={
        'required': 'Email міндетті өріс',
        'data_type': 'Email string типінде болу керек',
        'min_length': 'Email ұзындығы 5-ден кем',
        'max_length': 'Email ұзындығы 254-ден артық',
        'regex': 'Email форматы дұрыс емес'
    }),
            verify_data(data=password, required=True, data_type=str, min_length=4, max_length=254, error_messages={
                'required': 'Құпия сөз міндетті өріс',
                'data_type': 'Құпия сөз string типінде болу керек',
                'min_length': 'Құпия сөз ұзындығы 4-ден кем',
                'max_length': 'Құпия сөз ұзындығы 254-ден артық',
            })):
        if not is_valid:
            return False, JsonResponse({'message': error_message}, status=400)

    return True, None


def verify_register(data: Dict[str, Any]) -> Union[Tuple[bool, None], Tuple[bool, JsonResponse]]:
    is_valid_or_key_name, reason_or_none = verify_dict(data, [{'key_name': 'email'}, {'key_name': 'fullname', 'required': False}, {
        'key_name': 'password'}, {'key_name': 'role'}])

    if is_valid_or_key_name != True:
        return False, JsonResponse({'message': reason_or_none}, status=400)

    email = data.get('email')
    fullname = data.get('fullname')
    password = data.get('password')
    role = data.get('role')

    for is_valid, error_message in (verify_data(data=email, required=True, data_type=str, min_length=5, max_length=254, regex=r'(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)', error_messages={
        'required': 'Email міндетті өріс',
        'data_type': 'Email string типінде болу керек',
        'min_length': 'Email ұзындығы 5-ден кем',
        'max_length': 'Email ұзындығы 254-ден артық',
        'regex': 'Email форматы дұрыс емес'
    }), verify_data(data=fullname, required=False, data_type=str, min_length=1, max_length=50, error_messages={
        'data_type': 'Аты жөн string типінде болу керек',
        'min_length': 'Аты жөн ұзындығы 1-ден кем',
        'max_length': 'Аты жөн ұзындығы 50-ден артық',
    }),
            verify_data(data=password, required=True, data_type=str, min_length=4, max_length=254, error_messages={
                'required': 'Құпия сөз міндетті өріс',
                'data_type': 'Құпия сөз string типінде болу керек',
                'min_length': 'Құпия сөз ұзындығы 4-ден кем',
                'max_length': 'Құпия сөз ұзындығы 254-ден артық',
            }), verify_data(data=role, required=True, data_type=str, error_messages={
                'required': 'Рөл міндетті өріс',
                'data_type': 'Рөл string типінде болу керек',
            })):
        if not is_valid:
            return False, JsonResponse({'message': error_message}, status=400)

    if role not in [role_choices[0] for role_choices in User.ROLE_CHOICES]:
        return False, JsonResponse({'message': 'Қолдау көрсетілмейтін рөл түрі'}, status=400)

    return True, None


def verify_edit(data: Dict[str, Any]) -> Union[Tuple[bool, None], Tuple[bool, JsonResponse]]:
    email = data.get('email')
    fullname = data.get('fullname')

    for is_valid, error_message in (verify_data(data=email, required=False, data_type=str, min_length=5, max_length=254, regex=r'(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)', error_messages={
        'data_type': 'Email string типінде болу керек',
        'min_length': 'Email ұзындығы 5-ден кем',
        'max_length': 'Email ұзындығы 254-ден артық',
        'regex': 'Email форматы дұрыс емес'
    }), verify_data(data=fullname, required=False, data_type=str, min_length=1, max_length=50, error_messages={
        'data_type': 'Аты жөн string типінде болу керек',
        'min_length': 'Аты жөн ұзындығы 1-ден кем',
        'max_length': 'Аты жөн ұзындығы 50-ден артық',
    })):
        if not is_valid:
            return False, JsonResponse({'message': error_message}, status=400)

    return True, None


def verify_change_password(data: Dict[str, Any]) -> Union[Tuple[bool, None], Tuple[bool, JsonResponse]]:
    old_password = data.get('oldPassword')
    new_password = data.get('newPassword')

    for is_valid, error_message in (verify_data(data=old_password, required=True, data_type=str, min_length=4, max_length=254, error_messages={
        'required': 'Ескі құпия сөз міндетті өріс',
        'data_type': 'Құпия сөз string типінде болу керек',
        'min_length': 'Құпия сөз ұзындығы 4-ден кем',
        'max_length': 'Құпия сөз ұзындығы 254-ден артық',
    }), verify_data(data=new_password, required=True, data_type=str, min_length=4, max_length=254, error_messages={
        'required': 'Жаңа құпия сөз міндетті өріс',
        'data_type': 'Құпия сөз string типінде болу керек',
        'min_length': 'Құпия сөз ұзындығы 4-ден кем',
        'max_length': 'Құпия сөз ұзындығы 254-ден артық',
    })):
        if not is_valid:
            return False, JsonResponse({'message': error_message}, status=400)

    return True, None
