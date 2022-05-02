from django.http import JsonResponse
from django.views.generic import View

from dorm.models import City, Dorm,  DormImage, Room, RoomImage, Bed, BedImage, Organization
from dorm.verify import verify_city
from dorm.utils import get_organization
from dorm.serializer import serializer_organization, serializer_dorm, serializer_dorm_image, serializer_room, serializer_room_image, serializer_bed, serializer_bed_image
from user.models import User
from user.serializer import serializer_user
from order.models import Rent, Request, RequestAppendix, Order
from order.serializer import serializer_rent, serializer_request, serializer_request_appendix, serializer_order

from utils.auth import verify_token
from utils.data import get_data


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
            request_model_obj = user_or_response_content.request_set.first()
            if request_model_obj:
                serialized_request = serializer_request(request_model_obj)
                request_appendixs = RequestAppendix.objects.filter(
                    request=request_model_obj)
                request_appendixs = [serializer_request_appendix(
                    request_appendix, request) for request_appendix in request_appendixs]

                serialized_request['appendixs'] = request_appendixs

            else:
                serialized_request = None

            # tenant 只会有一个请求表单
            return JsonResponse({'messgae': 'Өтініштер', 'request': serialized_request}, status=200)

    def post(self, request):
        is_valid, user_or_response_content = verify_token(request)
        if not is_valid:
            return JsonResponse(user_or_response_content, status=401)

        idn = request.POST.get('idn')
        profession = request.POST.get('profession')
        supplementary_description = request.POST.get(
            'supplementary_description')

        request_model_obj = Request.objects.create(
            tenant=user_or_response_content, idn=idn, profession=profession, supplementary_description=supplementary_description)
        request_appendixs = []

        for file in request.FILES.values():
            request_appendix = RequestAppendix.objects.create(
                file=file, request=request_model_obj)
            request_appendixs.append(
                serializer_request_appendix(request_appendix, request))

        serialized_request = serializer_request(request_model_obj)
        serialized_request['appendixs'] = request_appendixs

        return JsonResponse({'message': 'Өтініш сәтті құрылды', 'request': serialized_request}, status=201)


class RequestSingleView(View):
    def delete(self, request, id):
        is_valid, user_or_response_content = verify_token(request)
        if not is_valid:
            return JsonResponse(user_or_response_content, status=401)

        Request.objects.get(id=id).delete()

        return JsonResponse({'message': 'Сәтті жойылды'})


class OrderView(View):
    def get(self, request):
        is_valid, user_or_response_content = verify_token(request)
        if not is_valid:
            return JsonResponse(user_or_response_content, status=401)

        if user_or_response_content.role == 'org manager':
            org = get_organization(user_or_response_content)
            dorms = org.dorm_set.all()
            order_list = []
            for dorm in dorms:
                for order in Order.objects.filter(dorm=dorm):
                    order_list.append(order)
                # rooms = dorm.room_set.all()
                # for room in rooms:
                #     beds = room.bed_set.all()
                #     for bed in beds:
                #         rent = bed.rent_set.first()
                #         orders = rent.order_set.all()

                #         if orders.exists():
                #             for order in orders:
                #                 order_list.append(order)

            serialized_orders = [serializer_order(order) for order in order_list]

            # request add request_appendixs
            for idx, order in enumerate(order_list):
                request_appendixs = RequestAppendix.objects.filter(
                    request=order.request)
                request_appendixs = [serializer_request_appendix(
                    request_appendix, request) for request_appendix in request_appendixs]
                serialized_orders[idx]['request']['appendixs'] = request_appendixs

            return JsonResponse({'message': 'success', 'orders': serialized_orders}, status=200)

        return JsonResponse({'message': 'success', 'orders': []}, status=200)

    def post(self, request):
        is_valid, user_or_response_content = verify_token(request)
        if not is_valid:
            return JsonResponse(user_or_response_content, status=401)

        # 入住请求
        request_model_obj = Request.objects.filter(
            tenant=user_or_response_content).first()
        if request_model_obj:
            data = get_data(request)
            dorm_id = data['dormId']

            from datetime import datetime
            order_no = str(datetime.now()).replace(' ', '').replace(
                '-', '').replace(':', '').replace('.', '')+str(user_or_response_content.id)

            Order.objects.create(
                order_no=order_no, request=request_model_obj, dorm=Dorm.objects.get(id=dorm_id))

            return JsonResponse({'message': 'Өтініш қалдырылды'}, status=201)

        else:
            return JsonResponse({'message': 'Өтініш жоқ', }, status=400)

    def put(self, request):
        is_valid, user_or_response_content = verify_token(request)
        if not is_valid:
            return JsonResponse(user_or_response_content, status=401)

        if user_or_response_content.role == 'org manager':
            org = get_organization(user_or_response_content)

            data = get_data(request)
            solution = data['solution']
            order_id = data['orderId']

            if solution:
                order = Order.objects.get(id=order_id)
                order.status = solution
                bed = Bed.objects.get(id=data['bedId'])
                rent = Rent.objects.get(bed=bed)
                order.rent=rent
                
                order.save()
                
                bed.owner = order.request.tenant
                bed.save()

                order.rent.order_set.all().exclude(id=order_id).delete()
            else:
                Order.objects.get(id=order_id).delete()

            # 获取新的orders列表
            org = get_organization(user_or_response_content)
            dorms = org.dorm_set.all()
            order_list = []
            for dorm in dorms:
                rooms = dorm.room_set.all()
                for room in rooms:
                    beds = room.bed_set.all()
                    for bed in beds:
                        rent = bed.rent_set.first()
                        orders = rent.order_set.all()

                        if orders.exists():
                            for order in orders:
                                order_list.append(order)

            serialized_orders = [serializer_order(
                order) for order in order_list]

            # request add request_appendixs
            for idx, order in enumerate(order_list):
                request_appendixs = RequestAppendix.objects.filter(
                    request=order.request)
                request_appendixs = [serializer_request_appendix(
                    request_appendix, request) for request_appendix in request_appendixs]
                serialized_orders[idx]['request']['appendixs'] = request_appendixs

            return JsonResponse({'message': 'Процесс сәтті аяқталды', 'orders': serialized_orders})


class StatisticView(View):

    def get(self, request):
        is_valid, user_or_response_content = verify_token(request)
        if not is_valid:
            return JsonResponse(user_or_response_content, status=401)

        if user_or_response_content.role != 'site admin':
            return JsonResponse({'message': 'Тек site admin-ға рұқсат'}, status=401)

        organizations = []
        for org in Organization.objects.all():
            serialized_org = serializer_organization(org)
            serialized_org['dormCount'] = org.dorm_set.all().count()

            organizations.append(serialized_org)

        users = [serializer_user(user) for user in User.objects.all().exclude(
            id=user_or_response_content.id)]
        orders = [serializer_order(order) for order in Order.objects.all()]

        data = {
            'organizations': organizations,
            'users': users,
            'orders': orders
        }

        return JsonResponse({'data': data}, status=200)
