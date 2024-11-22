from typing import Dict, Optional
from os import getenv
import jwt
from shared.settings import app_settings as settings
import time

# JWT_SECRET = getenv("JWT_SECRET") #TODO: add .env
# JWT_ALGORITHM = getenv("JWT_ALGORITHM")
# JWT_EXPIRE_TIME = int(getenv("JWT_EXPIRE_TIME")) # in seconds

JWT_SECRET = settings.jwt_secret
JWT_ALGORITHM = settings.jwt_algorithm
JWT_ACCESS_EXPIRE_TIME = settings.jwt_access_expire_time  # in seconds

def token_response(token: str):
    return {"access_token": token,
            "token_type": "Bearer"}

def signJWT(id_user: int) -> Dict[str, str]:
    access_payload = {"expires": time.time() + JWT_ACCESS_EXPIRE_TIME}
    access_token = jwt.encode(access_payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

    return token_response(access_token)

def decodeJWT(token: str) -> Optional[Dict[str, str]]:
    try:
        decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return decoded_token if decoded_token["expires"] >= time.time() else None
    except:
        return None
