from typing import Any, Tuple, Union, Dict
from django.core.handlers.wsgi import WSGIRequest

from django.core import serializers

from json import loads as json_loads


def get_data(request: WSGIRequest) -> Dict[str, Any]:
    '''get data from request body (raw)'''

    body = request.body

    try:
        body = body.decode('utf-8')
        if body == '':
            body = '{}'
    except:
        body = '{}'

    return json_loads(body)


def verify_data(data: Any, required: bool = True, data_type: Any = str,
                min_length: int = None, max_length: int = None,
                min: int = None, max: int = None, regex=None, error_messages: Dict[str, str] = {}) -> Union[Tuple[bool, None], Tuple[bool, str]]:

    no_need_verify = data is None and not required

    if no_need_verify:
        return True, None

    if required and data is None:
        return False, error_messages.get('required', 'міндетті өріс')

    if data_type and not isinstance(data, data_type):
        return False, error_messages.get('data_type', 'дұрыс емес тип')

    if data_type == str:
        if min_length and len(data) < min_length:
            return False, error_messages.get('min_length', 'минималды ұзындығынан аз')

        if max_length and len(data) > max_length:
            return False, error_messages.get('max_length', 'максималды ұзындығынан артық')

        from re import match as re_match
        if regex and re_match(regex, data) is None:
            return False, error_messages.get('regex', 'ережеге сәйкес емес')

    if data_type == int:
        if min and data < min:
            return False, error_messages.get('min', 'минималды мәннен аз')
        if max and data > max:
            return False, error_messages.get('max', 'максималды мәннен артық')

    return True, None


def serializer_data(data: Any, multiple: bool = True) -> Union[dict, list]:
    data = serializers.serialize('json', [data])
    data = json_loads(data)

    def customize_serialized_fileds(serialized_data: list) -> Union[dict, list]:
        result = [dict({'id': data.get('pk')}, **data.get('fields'))
                  for data in serialized_data]

        if multiple:
            return result
        return result[0]

    return customize_serialized_fileds(data)
