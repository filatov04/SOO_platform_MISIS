from fastapi import APIRouter, Path, HTTPException, status, Query, Body, dependencies, Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from typing import List, Optional, Dict, Any

from auth.state import AuthPair
from auth.handler import signJWT, decodeJWT
from auth.bearer import JWTBearer
from auth.models import (
    UserLoginSchema,
    UserSessionUpdateSchema
)

from schemas.models import (
    UserSchema,
    ViolationSchema
)

from db.manager import DBManager
from passlib.hash import bcrypt
from datetime import datetime, timedelta
import time


router = APIRouter(prefix="")
authpair = AuthPair()
db = DBManager("logger")
# db._recreate_tables()

@router.get("/ping", tags=["tests"])
async def get_server_status() -> str:
    return "pong"

# region auth
@router.post("/auth/register", tags=["auth"])
async def register(user: UserSchema = Body(...)) -> Dict[str, str]:
    if not db.create_user(user):
        return {"message": "User already exists"}
    
    return {"message": "User created"}
    

@router.post("/auth/login", tags=["auth"])
async def login(data: UserLoginSchema = Body(...)) -> Dict[str, str]:
    user: Optional[UserSchema] = db.get_user_by_email(data.email)
    if user is None:
        return {"message": "User not found"}
    
    active_tokens_in_db = db.get_tokens(user.id_user)
    active_tokens_in_cookies = authpair.get(active_tokens_in_db["access_token"])
    
    if active_tokens_in_cookies is not None and decodeJWT(active_tokens_in_cookies) is not None:
            return {"message": "User already logged in"}
    
    if not bcrypt.verify(data.password, user.password):
        return {"message": "Wrong password"}
    
    tokens = signJWT(user.id_user)
    # print("new user tokens {}".format(tokens))
    db.add_tokens(user.id_user, tokens)
    authpair.post(tokens["access_token"], user.id_user)
    resp = UserSessionUpdateSchema(
        access_token=tokens["access_token"],
        expires_at = tokens["expires_at"],
        refresh_token=tokens["refresh_token"],
    )
    return resp
    

@router.post("/auth/refresh", dependencies=[Depends(JWTBearer())], tags=["auth"])
async def refresh(token: HTTPAuthorizationCredentials = Depends(JWTBearer())) -> Dict[str, str]:
    ''' Create new access and refresh tokens by refresh token'''
    dec_token = decodeJWT(token)
    if dec_token is None or dec_token["token_type"] != "refresh":
        return {"message": "Invalid token"}
    
    user_id = dec_token["id_user"]
    tokens = db.get_tokens(user_id)
    if tokens["refresh_token"] != token:
        return {"message": "Invalid token"}
    
    authpair.pop(tokens["access_token"])
    
    tokens = signJWT(user_id)
    db.add_tokens(user_id, tokens)
    authpair.post(tokens["access_token"], user_id)
    return UserSessionUpdateSchema(
        access_token=tokens["access_token"],
        expires_at=time.time(),
        refresh_token=tokens["refresh_token"],
    )
    
@router.post("/auth/logout", dependencies=[Depends(JWTBearer())], tags=["auth"])
async def logout(token: HTTPAuthorizationCredentials = Depends(JWTBearer())) -> Dict[str, str]:
    decoded_info = decodeJWT(token)
    if decoded_info is None or decoded_info["token_type"] != "access":
        return {"message": "Invalid token"}
    
    user_id = authpair.get(token)
    if user_id is None:
        return {"message": "Invalid token"}
    
    authpair.pop(token)
    tokens = signJWT(user_id)
    db.add_tokens(user_id, tokens)
    return {"message": "Tokens deleted"}

# end region auth

@router.get("/user/profile/{user_email}", tags=["user"])
async def get_user_by_email(user_email: str = Query(...)) -> Dict[str, Any]:
    result = db.get_user_by_email(user_email)
    if result is None:
        return {"message": "User not found"}
    return {
        "email": result.email,
        "first_name": result.first_name,
        "second_name": result.second_name,
        "third_name": result.third_name,
        "sex": result.sex,
        "date_of_birth": result.date_of_birth
    }


@router.get("/events/get", tags=["events"]) # hz
async def get_events(max_events: int = 5) -> Dict[int, dict]:
    if max_events <= 0:
        max_events = 5
    return db.get_events(max_events=max_events)

@router.get("/events/get/{event_id}", tags=["events"])
async def get_event_by_id(event_id: int) -> Dict[int, dict]:
    return db.get_event(event_id)


# region secure
@router.post("/events/add", dependencies=[Depends(JWTBearer())], tags=["events"])
async def add_event(event: GameEventSchema = Body(...), token: HTTPAuthorizationCredentials = Depends(JWTBearer())) -> Dict[str, str]:
    if decodeJWT(token) is None or decodeJWT(token)["token_type"] != "access":
        return {"message": "Invalid token"}

    user_id = authpair.get(token)
    if user_id is None:
        return {"message": "Invalid token"}
    
    if not db.is_admin(user_id):
        return {"message": "User is not admin"}
    
    db.add_event(event)
    return {"message": "Event created"}

@router.post("/events/update/{event_id}", dependencies=[Depends(JWTBearer())], tags=["events"])
async def update_event(event_id: int, event: GameEventSchema = Body(...), token: HTTPAuthorizationCredentials = Depends(JWTBearer())) -> Dict[str, str]:
    if decodeJWT(token) is None or decodeJWT(token)["token_type"] != "access":
        return {"message": "Invalid token"}

    user_id = authpair.get(token)
    if user_id is None:
        return {"message": "Invalid token"}
    
    if not db.is_admin(user_id):
        return {"message": "User is not admin"}
    
    db.update_event(event_id, event)
    return {"message": "Event updated"}

@router.post("events/sign_user", dependencies=[Depends(JWTBearer())], tags=["events"])
async def sign_user_to_event(event_id: int, token: HTTPAuthorizationCredentials = Depends(JWTBearer())) -> Dict[str, str]:
    if decodeJWT(token) is None or decodeJWT(token)["token_type"] != "access":
        return {"message": "Invalid token"}
    
    user_id = authpair.get(token)
    if user_id is None:
        return {"message": "Invalid token"}
    
    if gb.sign_user_to_event(user_id, event_id):
        return {"message": "User signed"}
    
    return {"message": "User not signed"}
    
    
# end region secure

# test region
@router.get("/test/get_users", tags=["tests"])
async def get_users_test() -> Dict[int, dict]:
    return db.get_users_test()
# end test region