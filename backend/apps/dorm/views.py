from django.http import JsonResponse
from django.views.generic import View

from dorm.models import City, Dorm,  DormImage, Room, RoomImage, Bed, BedImage, Organization
from dorm.verify import verify_city, verify_dorm

from utils.auth import verify_token
from utils.data import get_data, serializer_data


class CityView(View):

    def get(self, request):
        cities = City.objects.all()

        return JsonResponse({'messgae': 'Қалалар тізімі', 'cities': serializer_data(cities)}, status=200)

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


class CitySingleView(View):

    def delete(self, request, id):
        is_valid, user_or_response_content = verify_token(request)
        if not is_valid:
            return JsonResponse(user_or_response_content, status=401)

        if user_or_response_content.role != 'site admin':
            return JsonResponse({'message': 'Қаланы тек site admin рөлді пайдаланушы жойа алады'}, status=401)

        try:
            city = City.objects.get(id=id)
        except City.DoesNotExist:
            city = None

        if city:
            city.delete()
            return JsonResponse({'message': 'Қала сәтті жойылды'}, status=200)

        return JsonResponse({'message': 'Қала табылмады'}, status=400)


class DormView(View):

    def get(self, request):
        is_valid, user_or_response_content = verify_token(request)
        if not is_valid:
            return JsonResponse(user_or_response_content, status=401)

        # all -> all dorm         (Default)
        # self -> just "my" dorm
        get_mode = request.GET.get('get_mode', 'all')
        get_mode = 'all' if get_mode not in ('all', 'self') else get_mode

        if get_mode == 'all':
            dorm_list = Dorm.objects.all()
        else:
            try:
                org = Organization.objects.get(
                    category=user_or_response_content)
            except Organization.DoesNotExist:
                org = None

            if org == None:
                return JsonResponse({'dorms': []}, status=200)
            dorm_list = Dorm.objects.filter(organization=org)

        serialized_dorm_list = serializer_data(dorm_list)
        for idx, dorm_obj in enumerate(dorm_list):
            serialized_dorm_list[idx]['creator'] = serializer_data(
                dorm_obj.creator, {'is_multiple': False, 'exclude_fields': ['password']})

        return JsonResponse({'dorms': serialized_dorm_list}, status=200)

    def post(self, request):
        is_valid, user_or_response_content = verify_token(request)
        if not is_valid:
            return JsonResponse(user_or_response_content, status=401)

        name = request.POST.get('name')
        description = request.POST.get('description')
        city_id = request.POST.get('city')
        address = request.POST.get('address')

        city = City.objects.get(id=city_id)
        # organization = Organization.objects.get(creator=user_or_response_content)
        # dorm = Dorm.objects.create(name=name, description=description, city=city, organization=organization)

        for file in request.FILES:
            print(file.size)

        # dorm_images = [DormImage.objects.create(dorm=dorm, image=i) for i in  ]

        return JsonResponse({'message': '123 Go!'})
        # new_dorm = Dorm.objects.create(
        #     **data, creator=user_or_response_content)

        # serialized_new_dorm = serializer_data(new_dorm, {'is_multiple': False})
        # serialized_new_dorm['creator'] = serializer_data(
        # new_dorm.creator, {'is_multiple': False, 'exclude_fields': ['password']})

        # return JsonResponse({'message': 'Жатақхана сәтті құрылды', 'dorm': serialized_new_dorm}, status=201)


class OrganizationView(View):
    def get(self, request):
        is_valid, user_or_response_content = verify_token(request)
        if not is_valid:
            return JsonResponse(user_or_response_content, status=401)

        # all -> all dorm         (Default)
        # self -> just "my" org
        get_mode = request.GET.get('get_mode', 'all')
        get_mode = 'all' if get_mode not in ('all', 'self') else get_mode

        if get_mode == 'all':
            organization_list = Organization.objects.all()
            
            return JsonResponse({'message': 'success all', }, status=200)

        else:
            organization = Organization.objects.filter(
                creator=user_or_response_content).first()

            if organization:
                print(serializer_data(organization, {'is_multiple': False, }))
                # creator = serializer_data(
                #     organization.creator, {'is_multiple': False, 'exclude_fields': ['password']})

                # test
                return JsonResponse({'message': 'success', }, status=200)

            else:
                serialized_organization = None

            return JsonResponse({'message': 'success', 'organization': serialized_organization}, status=200)
