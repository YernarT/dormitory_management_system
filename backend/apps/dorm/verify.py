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
