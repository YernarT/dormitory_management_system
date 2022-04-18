from utils.data import serializer_data, get_media_url
from user.serializer import serializer_user
from dorm.serializer import serializer_bed


def serializer_rent(rent_model_obj) -> dict:
    serialized_rent = serializer_data(rent_model_obj, {'is_multiple': False})
    serialized_rent['bed'] = serializer_bed(rent_model_obj.bed)

    return serialized_rent


def serializer_request(request_model_obj) -> dict:
    pass

def serializer_request_appendix(request_appendix_model_obj) -> dict:
    pass

def serializer_order(order_model_obj) -> dict:
    pass