from django.http import JsonResponse
from django.views.generic import View

from dorm.models import City, Dorm,  DormImage, OrganizationDormManager, Room, RoomImage, Bed, BedImage, Organization
from dorm.verify import verify_city
from dorm.utils import get_organization
from dorm.serializer import serializer_organization, serializer_dorm, serializer_dorm_image, serializer_room, serializer_room_image, serializer_bed, serializer_bed_image
from user.models import User
from user.serializer import serializer_user
from order.models import Rent, Request, RequestAppendix, Order
from order.serializer import serializer_rent, serializer_request, serializer_request_appendix, serializer_order

from utils.auth import verify_token
from utils.data import get_data, serializer_data


class RequestView(View):

    def get(self, request):
        is_valid, user_or_response_content = verify_token(request)
        if not is_valid:
            return JsonResponse(user_or_response_content, status=401)

        org = get_organization(user_or_response_content)
        dorms = org.dorm_set.all()
        request_obj_list = []
        for dorm in dorms:
            rooms = dorm.room_set.all()
            for room in rooms:
                beds = room.bed_set.all()
                for bed in beds:
                    rent = Rent.objects.get(bed=bed)
                    try: 
                        request_obj_list.append(Request.objects.get(rent=rent))
                    except:
                        pass
                    
        serialized_request_obj_list=[serializer_request(request_obj) for request_obj in request_obj_list ]
        

        return JsonResponse({'messgae': 'Өтініштер', 'requests': serialized_request_obj_list}, status=200)

    def post(self, request):
        is_valid, user_or_response_content = verify_token(request)
        if not is_valid:
            return JsonResponse(user_or_response_content, status=401)

        if user_or_response_content.role != 'site admin':
            return JsonResponse({'message': 'Қаланы тек site admin рөлді пайдаланушы құра алады'}, status=401)

        data = get_data(request)

        is_valid, response = verify_city(data)
        if not is_valid:
            return response

        try:
            city = City.objects.get(name=data.get('name'))
        except City.DoesNotExist:
            city = None

        if city:
            return JsonResponse({'message': 'Мұндай қала бар'}, status=400)

        city = City.objects.create(**data)

        return JsonResponse({'message': 'Қала сәтті қосылды', 'city': serializer_data(city, {'is_multiple': False})}, status=201)
