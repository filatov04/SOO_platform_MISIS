from pydantic import BaseModel, Field, EmailStr
from sqlalchemy.ext.declarative import declarative_base
from typing import Optional
from enum import Enum
from datetime import datetime
import re
from db.models import Role, DocumentType, ViolationType

class UserSchema(BaseModel):
    first_name: str = Field(..., min_length=2, max_length=50)
    second_name: str = Field(..., min_length=2, max_length=50)
    third_name: Optional[str] = Field(None, min_length=2, max_length=50)
    phone: str = Field(..., min_length=4, max_length=25)
    tg: str = Field(None, min_length=4, max_length=50)
    role: Role = Field(...)
    dorm_id: int = Field(...)
    
    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "first_name": "Ivan",
                "second_name": "Ivanov",
                "third_name": "Ivanovich",
                "phone": "78005553535",
                "tg": "@example",
                "role": "spectator",
                "dorm_id": 1,
            }
        }
        
class UserRegisterSchema(UserSchema):
    password: str = Field(..., min_length=4, max_length=64)
    
    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "first_name": "Ivan",
                "second_name": "Ivanov",
                "third_name": "Ivanovich",
                "phone": "78005553535",
                "tg": "@example",
                "role": "spectator",
                "dorm_id": 1,
                "password": "example"
            }
        }


class FloorSchema(BaseModel):
    floor_id: int = Field(...)
    floor_number: int = Field(...)
    dorm_id: int = Field(...)
    
    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "floor_id": 1,
                "floor_number": 1,
                "dorm_id": 1,
            }
        }
        
        
class ViolationSchema(BaseModel):
    document_type: DocumentType = Field(...)
    violator_name: str = Field(...)
    violation_type: ViolationType = Field(...)
    description: str = Field(...)
    room_id: int = Field(...)
    witness: str = Field(...) # Свидетель блять
    
    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "document_type": "act",
                "violator_name": "Иванов Иван Иванович",
                "violation_type": "fire_security",
                "description": "Smoke",
                "room_id": 1,
                "witness": "Иванов Сосед Соседович",
            }
        }
        
class ViolationWithRoomSchema(ViolationSchema):
    block_number: str = Field(...)
    room_number: str = Field(...)
    created_at: datetime = Field(...)
    
    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "room_id": 1,
                "block_number": "101",
                "room_number": "3",
                "document_type": "act",
                "violator_name": "Иванов Иван Иванович",
                "violation_type": "fire_security",
                "description": "Smoke",
                "witness": "Иванов Сосед Соседович",
                "created_at": "2022-01-01 00:00:00"
            }
        }
        

class NoteSchema(BaseModel):
    dorm_id: int = Field(...)
    room: str = Field(...)
    description: str = Field(...)
    
    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "dorm_id": 1,
                "room": "101",
                "description": "Заходите чаще туда"
            }
        }
        