from django.http import JsonResponse
from django.views.generic import View

from dorm.models import City, Dorm,  DormImage, Room, RoomImage, Bed, BedImage, Organization
from dorm.verify import verify_city
from dorm.utils import get_organization
from dorm.serializer import serializer_organization, serializer_dorm, serializer_dorm_image, serializer_room, serializer_room_image, serializer_bed, serializer_bed_image
from user.models import User
from user.serializer import serializer_user
from order.models import Rent
from order.serializer import serializer_rent

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
            org = get_organization(user_or_response_content)
            dorm_list = Dorm.objects.filter(organization=org) if org else []

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

        organization = Organization.objects.get(
            creator=user_or_response_content)

        dorm = Dorm.objects.create(
            name=name, description=description, city=city, address=address, organization=organization)
        dorm_images = []

        for image in request.FILES.values():
            dorm_image = DormImage.objects.create(image=image, dorm=dorm)
            dorm_images.append(serializer_dorm_image(dorm_image, request))

        dorm = serializer_dorm(dorm)
        dorm['images'] = dorm_images

        return JsonResponse({'message': 'Жатақхана сәтті құрылды', 'dorm': dorm, }, status=201)


class DormSingleView(View):

    def delete(self, request, id):
        is_valid, user_or_response_content = verify_token(request)
        if not is_valid:
            return JsonResponse(user_or_response_content, status=401)

        Dorm.objects.get(id=id).delete()

        return JsonResponse({'message': 'Сәтті жойылды'})


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


class RoomView(View):

    def get(self, request):
        is_valid, user_or_response_content = verify_token(request)
        if not is_valid:
            return JsonResponse(user_or_response_content, status=401)

        # all -> all dorm
        # self -> just "my" dorm (Default)
        # by_dorm -> by dorm id
        get_mode = request.GET.get('get_mode', 'self')
        get_mode = 'self' if get_mode not in (
            'all', 'self', 'by_dorm') else get_mode

        if get_mode == 'all':
            rooms = Room.objects.all()
            serialized_rooms = []
            for room in rooms:
                room_images = RoomImage.objects.filter(room=room)
                room = serializer_room(room)
                if room_images.exists():
                    room['images'] = [serializer_room_image(
                        room_image, request) for room_image in room_images]
                else:
                    room['images'] = []

                serialized_rooms.append(room)

            return JsonResponse({'message': 'success', 'rooms': serialized_rooms}, status=200)

        elif get_mode == 'by_dorm':
            dorm_id = request.GET.get('dorm_id')
            dorm = Dorm.objects.get(id=dorm_id)
            rooms = dorm.room_set.all()
            serialized_rooms = [serializer_room(room) for room in rooms]
            for idx, room in enumerate(rooms):
                room_images = room.roomimage_set.all()
                if room_images.exists():
                    serialized_rooms[idx]['images'] = [serializer_room_image(
                        room_image, request) for room_image in room_images]
                else:
                    serialized_rooms[idx]['images'] = []

            return JsonResponse({'message': 'success', 'rooms': serialized_rooms}, status=200)

        else:
            org = get_organization(user_or_response_content)
            dorms = Dorm.objects.filter(organization=org) if org else []

            rooms = []
            for dorm in dorms:
                this_dorm_rooms = Room.objects.filter(dorm=dorm)
                if this_dorm_rooms.exists():
                    for room in this_dorm_rooms:
                        room_images = RoomImage.objects.filter(room=room)
                        room = serializer_room(room)
                        rooms.append(room)
                        if room_images.exists():
                            room['images'] = [serializer_room_image(
                                room_image, request) for room_image in room_images]
                        else:
                            room['images'] = []

            return JsonResponse({'message': 'success', 'rooms': rooms}, status=200)

    def post(self, request):
        is_valid, user_or_response_content = verify_token(request)
        if not is_valid:
            return JsonResponse(user_or_response_content, status=401)

        name = request.POST.get('name')
        description = request.POST.get('description')
        floor = request.POST.get('floor')
        dorm_id = request.POST.get('dorm')

        dorm = Dorm.objects.get(id=dorm_id)

        room = Room.objects.create(
            name=name, description=description, floor=floor, dorm=dorm)
        room_images = []

        for image in request.FILES.values():
            room_image = RoomImage.objects.create(image=image, room=room)
            room_images.append(serializer_room_image(room_image, request))

        room = serializer_room(room)
        room['images'] = room_images

        return JsonResponse({'message': 'Сәтті құрылды', 'room': room, }, status=201)


class RoomSingleView(View):

    def delete(self, request, id):
        is_valid, user_or_response_content = verify_token(request)
        if not is_valid:
            return JsonResponse(user_or_response_content, status=401)

        Room.objects.get(id=id).delete()

        return JsonResponse({'message': 'Сәтті жойылды'})


class BedView(View):

    def get(self, request):
        is_valid, user_or_response_content = verify_token(request)
        if not is_valid:
            return JsonResponse(user_or_response_content, status=401)

        # self -> just "my" dorm (Default)
        # by_room -> by room id
        get_mode = request.GET.get('get_mode', 'self')
        get_mode = 'self' if get_mode not in (
            'all', 'self', 'by_room') else get_mode

        if get_mode == 'self':
            org = get_organization(user_or_response_content)
            dorms = Dorm.objects.filter(organization=org) if org else []

            rooms = []
            for dorm in dorms:
                this_dorm_rooms = Room.objects.filter(dorm=dorm)
                if this_dorm_rooms.exists():
                    for room in this_dorm_rooms:
                        rooms.append(room)

            beds = []
            for room in rooms:
                this_room_beds = Bed.objects.filter(room=room)
                if this_room_beds.exists():
                    for bed in this_room_beds:
                        serialized_bed = serializer_bed(bed)
                        bed_images = BedImage.objects.filter(bed=bed)
                        if bed_images.exists():
                            serialized_bed['images'] = [serializer_bed_image(
                                bed_image, request) for bed_image in bed_images]
                        else:
                            serialized_bed['images'] = []

                        rent = Rent.objects.get(bed=bed)
                        serialized_rent = serializer_rent(rent)
                        serialized_bed['rent'] = serialized_rent
                        beds.append(serialized_bed)

            return JsonResponse({'message': 'success', 'beds': beds}, status=200)

        # by_room
        else:
            room_id = request.GET.get('room_id')
            room = Room.objects.get(id=room_id)
            beds = [bed for bed in room.bed_set.all()]
            for idx, bed in enumerate(beds):
                beds[idx] = serializer_bed(bed)
                bed_images = bed.bedimage_set.all()
                if bed_images.exists():
                    beds[idx]['images'] = [serializer_bed_image(
                        bed_image, request) for bed_image in bed_images]
                else:
                    beds[idx]['images'] = []

                rent = serializer_rent(bed.rent_set.first())
                beds[idx]['rent'] = rent

            return JsonResponse({'message': 'success', 'beds': beds}, status=200)

    def post(self, request):
        is_valid, user_or_response_content = verify_token(request)
        if not is_valid:
            return JsonResponse(user_or_response_content, status=401)

        name = request.POST.get('name')
        description = request.POST.get('description')
        room_id = request.POST.get('room')

        room = Room.objects.get(id=room_id)

        bed = Bed.objects.create(
            name=name, description=description, room=room)
        bed_images = []

        for image in request.FILES.values():
            bed_image = BedImage.objects.create(image=image, bed=bed)
            bed_images.append(serializer_bed_image(bed_image, request))

        serialized_bed = serializer_bed(bed)
        serialized_bed['images'] = bed_images

        price = request.POST.get('price')
        duration = request.POST.get('duration')
        rent = Rent.objects.create(bed=bed, price=price, duration=duration)
        serialized_rent = serializer_rent(rent)
        serialized_bed['rent'] = serialized_rent

        return JsonResponse({'message': 'Сәтті құрылды', 'bed': serialized_bed}, status=201)


class BedSingleView(View):

    def delete(self, request, id):
        is_valid, user_or_response_content = verify_token(request)
        if not is_valid:
            return JsonResponse(user_or_response_content, status=401)

        Bed.objects.get(id=id).delete()

        return JsonResponse({'message': 'Сәтті жойылды'})
