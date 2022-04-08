from utils.data import serializer_data

def serializer_user(user_model_obj):
    return serializer_data(user_model_obj, {'is_multiple': False, 'exclude_fields': ['password']})

