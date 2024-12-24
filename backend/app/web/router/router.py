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
    ViolationWithRooms,
    RoomSchema,
    NoteSchema,
    FloorSchema,
    UnvalibalDutySchema
)

from db.models import Role

from db.manager import DBManager
from passlib.hash import bcrypt
from datetime import datetime, timedelta
import time


router = APIRouter(prefix="")
authpair = AuthPair()
db = DBManager("logger")
db._recreate_tables()

async def check_auth(token: HTTPAuthorizationCredentials = Depends(JWTBearer())):
    user_id = authpair.get(token)
    if user_id is None:
        raise HTTPException(status_code=401, detail={"message": "Invalid token or expired token."})
    
    return user_id
    
@router.get("/ping", tags=["tests"])
async def get_server_status() -> str:
    return "pong"

# region auth    
@router.post("/auth/login", tags=["auth"])
async def login(data: UserLoginSchema = Body(...)) -> Dict[str, str]:
    user = db.get_user_by_phone(data.phone)
    if user is None:
        raise HTTPException(status_code=401, detail={"message": "User not found"})
    
    if not bcrypt.verify(data.password, user.password):
        raise HTTPException(status_code=401, detail={"message": "Invalid password"})
    
    token_response = signJWT(user.user_id)
    authpair.post(token_response["access_token"], user.user_id)
    authpair.cleanup()
    return token_response
    
@router.post("/auth/logout", dependencies=[Depends(check_auth)], tags=["auth"])
async def logout(token: str = Depends(JWTBearer() )) -> Dict[str, str]:
    authpair.del_token(token)
    return {"message": "Logout"}

# end region auth

#TODO: проверку роли (второстепенное)

# secure region
@router.get("/user/info/", dependencies=[Depends(check_auth)], tags=["user"])
async def get_user_info(user_id: int = Depends(check_auth)) -> UserSchema:
    user = db.get_user_by_id(user_id)
    return UserSchema.from_orm(user).dict()

@router.post("/user/register", dependencies=[Depends(check_auth)], tags=["user"])
async def register_user(user: UserRegisterSchema = Body(...)):
    user.password = bcrypt.hash(user.password)
    if db.add_user(user):
        return {"message": "User created"}
    else:
        return {"message": "User number already exists"}

@router.post("/user/delete/{numberToDelete}", dependencies=[Depends(check_auth)], tags=["user"])
async def delete_user(user_id: int = Depends(check_auth), number_to_delete: str = Path(..., alias="numberToDelete")):
    user_in_db = db.get_user_by_phone(number_to_delete)
    if user_in_db is None:
        return {"message": "User not found"}
    if authpair.get(user_in_db.user_id):
        return {"message": "User is logged in"}
    if user_in_db.user_id == user_id:
        return {"message": "You cannot delete yourself"}
    
    if db.delete_user(number_to_delete):
        return {"message": "User deleted"}
    
    return {"message": "User not found"}

@router.get("/user/get/{role}", dependencies=[Depends(check_auth)], tags=["user"]) # TODO: add dorm_id!!!
async def get_user_by_role(role: Role = Path(..., example=Role.admin), user_id: int = Depends(check_auth)) -> List[UserSchema]:
    dorm_id = db.get_user_by_id(user_id).dorm_id
    return db.get_users_by_role(role, dorm_id)
    
@router.get("/floors/{dorm_id}/get", dependencies=[Depends(check_auth)], tags=["dorm"])
async def get_floors(dorm_id: int = Path(..., example=1)) -> List[FloorSchema]:
    return db.get_floors(dorm_id)

@router.post("/violations/add", dependencies=[Depends(check_auth)], tags=["violations"])
async def add_note(data: ViolationSchema = Body(...), user_id: int = Depends(check_auth)):
    db.add_violation(user_id, data)
    return {"message": "Violation added"}

@router.get("/violations/{floor_id}/rooms/get", dependencies=[Depends(check_auth)], tags=["violations"])
async def get_rooms_with_violations(floor_id: int = Path(..., example=1)) -> List[RoomSchema]:
    data = db.get_rooms_with_violations(floor_id)
    return data

@router.get("/violations/{dorm_id}/get", dependencies=[Depends(check_auth)], tags=["violations"])
async def get_last_violations(dorm_id: int = Path(..., example=1), limit: int = Query(default=5)) -> List[ViolationWithRooms]:
    if limit <= 0:
        raise HTTPException(status_code=400, detail={"message": "Limit must be greater than 0"})
    return db.get_last_violations(dorm_id, limit)

@router.get("/notes/{dorm_id}/get", dependencies=[Depends(check_auth)], tags=["notes"])
async def get_notes(dorm_id: int) -> List:
    return db.get_notes(dorm_id)

@router.post("/notes/add", dependencies=[Depends(check_auth)], tags=["notes"])
async def add_note(data: NoteSchema = Body(...), user_id: int = Depends(check_auth)): # TODO: переделать dorm_id
    db.add_note(user_id, data)
    return {"message": "Note added"}

@router.post("/duty/{dorm_id}/add", tags=["duty"])
async def add_duty(dorm_id : int = Path(...), data: UnvalibalDutySchema = Body(...)):
    if db.add_duty(dorm_id, data):
        return {"message": "Duty added"}
    return {"message": "Some dates are already taken"}

@router.get("/duty/{dorm_id}/get", tags=["duty"])
async def test_get_duty(dorm_id : int = Path(...)):
    return db.get_duty(dorm_id)
# end secure region