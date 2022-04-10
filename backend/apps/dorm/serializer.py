from utils.data import serializer_data, get_media_url
from user.serializer import serializer_user


def serializer_city(city_model_obj) -> dict:
    return serializer_data(city_model_obj, {'is_multiple': False})


def serializer_organization(organization_model_obj):
    serialized_organization = serializer_data(
        organization_model_obj, {'is_multiple': False})
    serialized_organization['creator'] = serializer_user(
        organization_model_obj.creator)
    return serialized_organization


def serializer_dorm(dorm_model_obj) -> dict:
    serialized_dorm = serializer_data(dorm_model_obj, {'is_multiple': False})
    if serialized_dorm['city']:
        serialized_dorm['city'] = serializer_city(dorm_model_obj.city)
    serialized_dorm['organization'] = serializer_organization(
        dorm_model_obj.organization)

    return serialized_dorm


def serializer_dorm_image(dorm_image_model_obj, request) -> dict:
    serialized_dorm_image = serializer_data(
        dorm_image_model_obj, {'is_multiple': False})
    serialized_dorm_image['dorm'] = serializer_dorm(dorm_image_model_obj.dorm)
    serialized_dorm_image['image'] = get_media_url(
        request, serialized_dorm_image['image'])

    return serialized_dorm_image