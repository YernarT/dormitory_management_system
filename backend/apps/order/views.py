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

        if user_or_response_content.role == 'org manager':
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
                            request_obj_list.append(
                                Request.objects.get(rent=rent))
                        except:
                            pass

            serialized_request_obj_list = [serializer_request(
                request_obj) for request_obj in request_obj_list]

            return JsonResponse({'messgae': 'Өтініштер', 'requests': serialized_request_obj_list}, status=200)
        # tenant
        else:
            # tenant 只会有一个请求表单
            request = user_or_response_content.request_set.first()
            if request:
                serialized_request = None
            else:
                serialized_request = None

            # tenant 只会有一个请求表单
            return JsonResponse({'messgae': 'Өтініштер', 'request': serialized_request}, status=200)

    def post(self, request):
        is_valid, user_or_response_content = verify_token(request)
        if not is_valid:
            return JsonResponse(user_or_response_content, status=401)

        return JsonResponse({'message': 'Өтініш сәтті құрылды', 'request': {'idn': 1}}, status=201)


class OrderView(View):
    def get(self, request):
        is_valid, user_or_response_content = verify_token(request)
        if not is_valid:
            return JsonResponse(user_or_response_content, status=401)

        return JsonResponse({'message': 'success', 'orders': []}, status=201)

    def post(self, request):
        is_valid, user_or_response_content = verify_token(request)
        if not is_valid:
            return JsonResponse(user_or_response_content, status=401)

        data = get_data(request)

        bed_id = data['bedId']
        bed = Bed.objects.get(id=bed_id)

        request = Request.objects.filter(
            tenant=user_or_response_content).first()
        if request:
            pass
            # bed,
            # request
        else:
            return JsonResponse({'message': 'Өтініш жоқ', }, status=400)

        return JsonResponse({'message': 'success', 'order': {}}, status=201)
