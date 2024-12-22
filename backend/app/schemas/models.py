from pydantic import BaseModel, Field, EmailStr
from sqlalchemy.ext.declarative import declarative_base
from typing import Optional, List
from enum import Enum
from datetime import datetime, date
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
    owner_first_name: str = Field(...)
    owner_second_name: str = Field(...)
    owner_third_name: str = Field(None)
    owner_tg: str = Field(None)
    owner_phone: str = Field(...)
    
    
    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "floor_id": 1,
                "floor_number": 1,
                "dorm_id": 1,
                "owner_first_name": "Ivan",
                "owner_second_name": "Ivanov",
                "owner_third_name": "Ivanovich",
                "owner_tg": "@example",
                "owner_phone": "78005553535",
            }
        }
        
        
class ViolationSchema(BaseModel):
    document_type: DocumentType = Field(...)
    violator_name: str = Field(...)
    violation_type: ViolationType = Field(...)
    description: str = Field(...)
    room_id: int = Field(...)
    dorm_id: int = Field(...)
    witness: str = Field(...) # Свидетель блять
    created_at: datetime = Field(default_factory=datetime.now)
    
    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "document_type": "act",
                "violator_name": "Иванов Иван Иванович",
                "violation_type": "electrical_security",
                "description": "Smoke",
                "room_id": 1,
                "dorm_id": 1,
                "witness": "Иванов Сосед Соседович",
                "created_at": "2022-01-01 00:00:00"
            }
        }
        
class RoomSchema(BaseModel):
    room_id: int = Field(...)
    floor_id: int = Field(...)
    block_number: int = Field(...)
    room_number: Optional[int] = Field(None)
    violations: List[ViolationSchema] = Field(default_factory=list)
    
    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "room_id": 1,
                "floor_id": 1,
                "block_number": 1,
                "room_number": 101,
                "violations": []
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
        
class UnvalibalDutySchema(BaseModel):
    user_id: int = Field(...)
    dates: List[date] = Field(...)
    
    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "user_id": 1,
                "dates": ["2022-01-01", "2022-01-02"]
            }
        }
    