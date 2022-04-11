from django.http import JsonResponse
from django.views.generic import View

from dorm.models import City, Dorm,  DormImage, OrganizationDormManager, Room, RoomImage, Bed, BedImage, Organization
from dorm.verify import verify_city, verify_dorm
from dorm.serializer import *
from user.models import User

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

        # all -> all dorm (Default)
        # self -> just "my" dorm
        get_mode = request.GET.get('get_mode', 'all')
        get_mode = 'all' if get_mode not in ('all', 'self') else get_mode

        if get_mode == 'all':
            dorm_list = Dorm.objects.all()
        else:
            try:
                org = Organization.objects.get(
                    creator=user_or_response_content)
            except Organization.DoesNotExist:
                # dorm manager
                org = OrganizationDormManager.objects.get(
                    dorm_manager=user_or_response_content).organization

            dorm_list = Dorm.objects.filter(organization=org)

        serialized_dorm_list = [serializer_dorm(
            dorm_obj) for dorm_obj in dorm_list]

        for idx, dorm in enumerate(dorm_list):
            serialized_dorm_list[idx]['images'] = []
            for dorm_image in DormImage.objects.filter(dorm=dorm):
                serialized_dorm_list[idx]['images'].append(
                    serializer_dorm_image(dorm_image, request))

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
        try:
            organization = Organization.objects.get(
                creator=user_or_response_content)
        except Organization.DoesNotExist:
            organization = OrganizationDormManager.get(
                user=user_or_response_content)

        dorm = Dorm.objects.create(
            name=name, description=description, city=city, address=address, organization=organization)
        dorm_images = []

        for image in request.FILES.values():
            dorm_image = DormImage.objects.create(image=image, dorm=dorm)
            dorm_images.append(serializer_dorm_image(dorm_image, request))

        dorm = serializer_dorm(dorm)
        dorm['images'] = dorm_images

        return JsonResponse({'message': 'success', 'dorm': dorm, }, status=201)


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
                return JsonResponse({'message': 'success', 'organization': serializer_organization(organization)}, status=200)

            else:
                serialized_organization = None

            return JsonResponse({'message': 'success', 'organization': serialized_organization}, status=200)

    def post(self, request):
        is_valid, user_or_response_content = verify_token(request)
        if not is_valid:
            return JsonResponse(user_or_response_content, status=401)

        data = get_data(request)

        organization = Organization.objects.create(
            creator=user_or_response_content, **data)

        serialized_organization = serializer_data(
            organization, {'is_multiple': False})

        serialized_organization['creator'] = serializer_data(
            organization.creator, {'is_multiple': False, 'exclude_fields': ['password']})

        return JsonResponse({'message': 'success', 'organization': serialized_organization}, status=201)


class OrganizationCategoryView(View):
    def get(self, request):

        return JsonResponse({'categories': Organization.CATEGORY_CHOICES}, status=200)


class DormManagerView(View):

    def get(self, request):
        is_valid, user_or_response_content = verify_token(request)
        if not is_valid:
            return JsonResponse(user_or_response_content, status=401)

        org = Organization.objects.get(creator=user_or_response_content)
        org_managers = OrganizationDormManager.objects.filter(organization=org)
        serialized_managers = []
        for org_manager in org_managers:
            user = User.objects.get(id=org_manager.dorm_manager.id)
            serialized_managers.append(serializer_user(user))

        return JsonResponse({'message': 'success', 'dorm_managers': serialized_managers}, status=200)

    def post(self, request):
        is_valid, user_or_response_content = verify_token(request)
        if not is_valid:
            return JsonResponse(user_or_response_content, status=401)

        data = get_data(request)

        manager = User.objects.create(**data)
        org = Organization.objects.get(creator=user_or_response_content)
        OrganizationDormManager.objects.create(
            organization=org, dorm_manager=manager)

        return JsonResponse({'message': 'Сәтті құрылды', 'dorm_manager': serializer_user(manager)}, status=201)


class DormManagerSingleView(View):

    def delete(self, request, id):
        is_valid, user_or_response_content = verify_token(request)
        if not is_valid:
            return JsonResponse(user_or_response_content, status=401)

        User.objects.get(id=id).delete()

        return JsonResponse({'message': 'Сәтті жойылды'})
