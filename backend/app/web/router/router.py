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

async def check_auth(token: HTTPAuthorizationCredentials = Depends(JWTBearer())):
    user_id = authpair.get(token)
    if user_id is None:
        raise HTTPException(status_code=403, detail="Invalid token or expired token.")
    
    return user_id
    
    
@router.get("/ping", tags=["tests"])
async def get_server_status() -> str:
    """
    Simple health check route to verify that the application is running.
    
    Returns:
        str: "pong"
    """
    return "pong"

# region auth    
@router.post("/auth/login", tags=["auth"])
async def login(data: UserLoginSchema = Body(...)) -> Dict[str, str]:
    user = db.get_user(data.phone)
    if user is None:
        return {"message": "User not found"}
    
    if not bcrypt.verify(data.password, user.hashed_password):
        return {"message": "Invalid password"}
    
    token_response = signJWT(user.user_id)
    authpair.post(token_response["access_token"], user.user_id)
    return token_response
    

@router.post("/auth/logout", dependencies=[Depends(check_auth)], tags=["auth"])
async def logout(user_id: int = Depends(check_auth)) -> Dict[str, str]:
    token_response = signJWT(0)
    authpair.post(token_response["access_token"], user_id)
    return {"message": "Logout"}

# end region auth

#TODO: Fixx alllll

@router.get("/user/info", dependencies=[Depends(check_auth)], tags=["user"])
async def get_user_info(user_id: int = Depends(check_auth)) -> Dict[str, Any]:
    user = db.get_user(user_id)
    return UserSchema (
        first_name=user.first_name,
        second_name=user.second_name,
        third_name=user.third_name,
        number=user.number,
        tg=user.tg,
        role=user.role,
        dorm_id=user.dorm_id
    )

@router.post("/notes/add", dependencies=[Depends(check_auth)], tags=["notes"])
async def add_note(data: ViolationSchema = Body(...), user_id: int = Depends(check_auth)):
    return db.add_violation(user_id, data)

@router.get("/notes/get", dependencies=[Depends(check_auth)], tags=["notes"])
async def get_notes(dorm_id: int, floor: int, user_id: int = Depends(check_auth)) -> Dict[int, dict]:
    return db.get_violations(dorm_id, floor)

