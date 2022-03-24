from typing import Any, Literal, Tuple, Union, Dict, List
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


def verify_dict(_dict: Dict[str, Any], rules: List[Dict[str, Any]] = [], absolutely_consisten: bool = True) -> Union[Tuple[Literal[True], None], Tuple[str, Literal['DoesNotExist']], Tuple[str, Literal['EXTRA']]]:
    '''
    检测字典内是否存在指定的 keys
    存在返回 True, None
    不存在则返回不存在的 key_name, 'DoesNotExist'

    rules 定义如下
    [{ key_name: 'username', required: True }, ... }]

    required 默认为 True

    绝对一致模式下 (absolutely_consisten) 
    _dict的 keys 不能够比 rules 指定的 keys 多或少, 除了标记为 required=False 的项
    不满足绝对一致模式时返回 key_name, 'EXTRA'
    '''
    _dict_keys = _dict.keys()

    for rule in rules:
        # 无需校验 或者 校验成功
        if (rule.get('required', True) == False or rule['key_name'] in _dict_keys):
            continue

        return rule['key_name'], 'DoesNotExist'

    # 查找多余的 key, 保证绝对一致性 (absolutely_consisten)
    if absolutely_consisten:
        # 规则指定需要有的 keys
        rule_keys = [rule['key_name'] for rule in rules]

        for key_name in _dict_keys:
            if key_name not in rule_keys:
                return key_name, 'EXTRA'

    return True, None


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
    data = serializers.serialize('json', data if multiple else [data])
    data = json_loads(data)

    def customize_serialized_fileds(serialized_data: list) -> Union[dict, list]:
        result = [dict({'id': data.get('pk')}, **data.get('fields'))
                  for data in serialized_data]

        if multiple:
            return result
        return result[0]

    return customize_serialized_fileds(data)
