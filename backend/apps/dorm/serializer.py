from utils.data import serializer_data
from user.serializer import serializer_user

def serializer_city(city_model_obj):
    return serializer_data(city_model_obj, {'is_multiple': False})

def serializer_organization(organization_model_obj):
    serialized_organization = serializer_data(organization_model_obj, {'is_multiple': False})
    serialized_organization['creator'] = serializer_user(organization_model_obj.creator)
    return serialized_organization


def serializer_dorm(dorm_model_obj):
    serialized_dorm = serializer_data(dorm_model_obj, {'is_multiple': False})
    serialized_dorm['city'] = serializer_city(dorm_model_obj.city)
    serialized_dorm['organization'] = serializer_organization(dorm_model_obj.organization)

    return serialized_dorm
    
def serializer_dorm_image(dorm_image_model_obj):
    serialized_dorm_image = serializer_data(dorm_image_model_obj, {'is_multiple': False})
    serialized_dorm_image['dorm'] = serializer_dorm(dorm_image_model_obj.dorm)

    return serialized_dorm_image