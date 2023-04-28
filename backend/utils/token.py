# Django
from django.core.handlers.wsgi import WSGIRequest
from django.conf import settings
# User model
from user.models import User
# Libs
from cryptocode import encrypt, decrypt
# Python Fn
from datetime import datetime, timedelta


def verify_token(request: WSGIRequest):
    token = request.headers.get('Authorization')
    payload = decrypt(token, settings.SECRET_KEY)

    if token and payload:
        id, token_expire_date = payload.split('.')
        token_expire_date = datetime.strptime(token_expire_date, '%Y%m%d%H%M')
        now = datetime.now()

        # not expired
        if (now - token_expire_date).days < 0:
            try:
                user = User.objects.get(id=id)
            except User.DoesNotExist:
                return False, {'message': 'Пайдаланушы табылмады'}

            return True, user
        else:
            return False, {'message': 'Авторизация мерзімі аяқталды'}

    return False, {'message': 'Авторизация сәтсіз болды'}


def generate_token(id: int) -> str:
    '''generate token by user id'''

    now = datetime.now()
    token_limit = timedelta(days=10)
    token_expire_date = (now + token_limit).strftime('%Y%m%d%H%M')

    # id.expire-date
    payload = str(id) + '.' + token_expire_date
    token = encrypt(payload, settings.SECRET_KEY)

    return token
