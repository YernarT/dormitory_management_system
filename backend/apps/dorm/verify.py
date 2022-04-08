from typing import Dict, Union, Tuple, Any

from django.http import JsonResponse

from utils.data import verify_data, verify_dict


def verify_city(data: Dict[str, Any]) -> Union[Tuple[bool, None], Tuple[bool, JsonResponse]]:
    name = data.get('name')

    is_valid, error_message = verify_data(data=name, required=True, data_type=str, max_length=40, error_messages={
        'required': 'Қала атауы міндетті өріс',
        'data_type': 'Қала атауы string типінде болу керек',
        'max_length': 'Қала атауының ұзындығы 40-ден артық',
    })

    if not is_valid:
        return False, JsonResponse({'message': error_message}, status=400)

    is_valid_or_key_name, reason_or_none = verify_dict(
        data, [{'key_name': 'name'}])

    if is_valid_or_key_name != True:
        return False, JsonResponse({'message': reason_or_none}, status=400)

    return True, None


def verify_dorm(data: Dict[str, Any]) -> Union[Tuple[bool, None], Tuple[bool, JsonResponse]]:
    name = data.get('name')
    desciption = data.get('desciption')
    city = data.get('city')
    address = data.get('address')
    images = data.get('images')

    for is_valid, error_message in (verify_data(data=name, required=True, data_type=str, max_length=40, error_messages={
        'required': 'Жатақхана атауы міндетті өріс',
        'data_type': 'Жатақхана атауы string типінде болу керек',
        'max_length': 'Жатақхана атауының ұзындығы 40-ден артық',
    }), verify_data(data=desciption, required=False, data_type=str, max_length=254, error_messages={
        'data_type': 'Жатақхана сипаттамасы string типінде болу керек',
        'max_length': 'Жатақхана сипаттамасының ұзындығы 254-ден артық',
    }), verify_data(data=city, required=True, data_type=int, error_messages={
        'required': 'Жатақхананың орналасқан қаласы міндетті өріс',
        'data_type': 'Жатақхананың орналасқан қаласы int типінде болу керек',
    }), verify_data(data=address, required=True, data_type=str, max_length=60, error_messages={
        'required': 'Жатақхананың нақты мекен-жайы міндетті өріс',
        'data_type': 'Жатақхананың нақты мекен-жайы string типінде болу керек',
        'max_length': 'Жатақхананың нақты мекен-жайының ұзындығы 60-ден артық',
    })):
        if not is_valid:
            return False, JsonResponse({'message': error_message}, status=400)

    is_valid_or_key_name, reason_or_none = verify_dict(data, [{'key_name': 'name'}, {'key_name': 'description', 'required': False}, {
        'key_name': 'city'}, {'key_name': 'address'}])

    if is_valid_or_key_name != True:
        return False, JsonResponse({'message': reason_or_none}, status=400)

    return True, None
