from fastapi import APIRouter, Path, HTTPException, status, Query, Body, dependencies, Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from typing import List, Optional, Dict, Any

from auth.state import AuthPair
from auth.handler import signJWT, decodeJWT
from auth.bearer import JWTBearer
from auth.models import (
    UserLoginSchema
)

from schemas.models import (
    UserSchema,
    UserRegisterSchema,
    ViolationSchema,
    RoomSchema,
    NoteSchema,
    FloorSchema
)

from db.manager import DBManager
from passlib.hash import bcrypt
from datetime import datetime, timedelta
import time


router = APIRouter(prefix="")
authpair = AuthPair()
db = DBManager("logger")
# db._recreate_tables()

async def check_auth(token: HTTPAuthorizationCredentials = Depends(JWTBearer())):
    user_id = authpair.get(token)
    if user_id is None:
        raise HTTPException(status_code=401, detail="Invalid token or expired token.")
    
    return user_id
    
    
@router.get("/ping", tags=["tests"])
async def get_server_status() -> str:
    return "pong"

# region auth    
@router.post("/auth/login", tags=["auth"])
async def login(data: UserLoginSchema = Body(...)) -> Dict[str, str]:
    user = db.get_user_by_phone(data.phone)
    if user is None:
        return {"message": "User not found"}
    
    if not bcrypt.verify(data.password, user.hashed_password):
        return {"message": "Invalid password"}
    
    token_response = signJWT(user.user_id)
    authpair.post(token_response["access_token"], user.user_id)
    authpair.cleanup()
    return token_response
    

@router.post("/auth/logout", dependencies=[Depends(check_auth)], tags=["auth"])
async def logout(token: str = Depends(JWTBearer() )) -> Dict[str, str]:
    authpair.post(token, None)
    return {"message": "Logout"}

# end region auth

#TODO: проверку роли (второстепенное)

# secure region
@router.get("/user/info", dependencies=[Depends(check_auth)], tags=["user"])
async def get_user_info(user_id: int = Depends(check_auth)) -> Dict[str, Any]:
    user = db.get_user_by_id(user_id)
    return UserSchema.from_orm(user).dict()

@router.post("/user/register", dependencies=[Depends(check_auth)], tags=["user"])
async def register_user(user: UserRegisterSchema = Body(...)):
    user.password = bcrypt.hash(user.password)
    if db.add_user(user):
        return {"message": "User created"}
    else:
        return {"message": "User already exists"}

@router.get("/floors/get/{dorm_id}", dependencies=[Depends(check_auth)], tags=["dorm"])
async def get_floors(dorm_id: int = Path(..., example=1)) -> List[FloorSchema]:
    return db.get_floors(dorm_id)

@router.post("/violations/add", dependencies=[Depends(check_auth)], tags=["violations"])
async def add_note(data: ViolationSchema = Body(...), user_id: int = Depends(check_auth)):
    db.add_violation(user_id, data)
    return {"message": "Violation added"}

@router.get("/violations/rooms/get/{floor_id}", dependencies=[Depends(check_auth)], tags=["violations"])
async def get_rooms_with_violations(floor_id: int = Path(..., example=1)) -> List[RoomSchema]:
    data = db.get_rooms_with_violations(floor_id)
    return data

@router.get("/notes/get", dependencies=[Depends(check_auth)], tags=["notes"])
async def get_notes(dorm_id: int) -> List:
    return db.get_notes(dorm_id)

@router.post("/notes/add", dependencies=[Depends(check_auth)], tags=["notes"])
async def add_note(data: NoteSchema = Body(...), user_id: int = Depends(check_auth)):
    db.add_note(user_id, data)
    return {"message": "Note added"}

# end secure region