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


def serializer_room(room_model_obj) -> dict:
    serialized_room = serializer_data(room_model_obj, {'is_multiple': False})
    serialized_room['dorm'] = serializer_dorm(room_model_obj.dorm)

    return serialized_room


def serializer_room_image(room_image_model_obj, request) -> dict:
    serialized_room_image = serializer_data(
        room_image_model_obj, {'is_multiple': False})
    serialized_room_image['room'] = serializer_room(room_image_model_obj.room)
    serialized_room_image['image'] = get_media_url(
        request, serialized_room_image['image'])

    return serialized_room_image


def serializer_bed(bed_model_obj) -> dict:
    serialized_bed = serializer_data(bed_model_obj, {'is_multiple': False})
    serialized_bed['room'] = serializer_room(bed_model_obj.room)
    serialized_bed['owner'] = serializer_user(
        bed_model_obj.owner) if bed_model_obj.owner else None

    return serialized_bed


def serializer_bed_image(bed_image_model_obj, request) -> dict:
    serialized_bed_image = serializer_data(
        bed_image_model_obj, {'is_multiple': False})
    serialized_bed_image['bed'] = serializer_bed(bed_image_model_obj.bed)
    serialized_bed_image['image'] = get_media_url(
        request, serialized_bed_image['image'])

    return serialized_bed_image