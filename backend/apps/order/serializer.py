from utils.data import serializer_data, get_media_url
from user.serializer import serializer_user
from dorm.serializer import serializer_bed


def serializer_rent(rent_model_obj) -> dict:
    serialized_rent = serializer_data(rent_model_obj, {'is_multiple': False})
    serialized_rent['bed'] = serializer_bed(rent_model_obj.bed)

    return serialized_rent


def serializer_request(request_model_obj) -> dict:
    serialized_request = serializer_data(
        request_model_obj, {'is_multiple': False})
    serialized_request['tenant'] = serializer_user(request_model_obj.tenant)

    return serialized_request


def serializer_request_appendix(request_appendix_model_obj, request) -> dict:
    serialized_request_appendix = serializer_data(
        request_appendix_model_obj, {'is_multiple': False})
    serialized_request_appendix['request'] = serializer_request(
        request_appendix_model_obj.request)
    serialized_request_appendix['file'] = get_media_url(
        request, serialized_request_appendix['file'])

    return serialized_request_appendix


def serializer_order(order_model_obj) -> dict:
    serialized_order = serializer_data(
        order_model_obj, {'is_multiple': False})

    serialized_order['request'] = serializer_request(order_model_obj.request)
    serialized_order['rent'] = serializer_rent(order_model_obj.rent)

    return serialized_order
