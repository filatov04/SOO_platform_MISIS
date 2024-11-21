from pydantic import BaseModel, Field, EmailStr
from sqlalchemy.ext.declarative import declarative_base
from typing import Optional
from enum import Enum
from datetime import datetime
import re

class UserSchema(BaseModel):
    first_name: str = Field(..., min_length=2, max_length=50)
    second_name: str = Field(..., min_length=2, max_length=50)
    third_name: Optional[str] = Field(None, min_length=2, max_length=50)
    number: str = Field(..., min_length=4, max_length=25)
    tg: str = Field(None, min_length=4, max_length=50)
    role: str = Field(..., min_length=4, max_length=50)
    dorm_id: int = Field(...)
    password: str = Field(..., min_length=8, max_length=64)
    
    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "first_name": "Ivan",
                "second_name": "Ivanov",
                "third_name": "Ivanovich",
                "number": "88005553535",
                "tg": "@example",
                "role": "spectator",
                "dorm_id": 1,
                "password": "example"
            }
        }


class ViolationSchema(BaseModel): # TODO: user_id???
    user_id: int = Field(...)
    document_type: str = Field(...)
    violators_name: str = Field(...)
    violation_type: str = Field(...)
    description: str = Field(...)
    room_id: int = Field(...)    
    witness: str = Field(...) # Свидетель блять
    
    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "user_id": 1,
                "document_type": "act",
                "violators_name": "Иванов Иван Иванович",
                "violation_type": "fire_security",
                "description": "Smoke",
                "room_id": 1,
                "witness": "Иванов Сосед Соседович",
            }
        }
        

class NoteSchema(BaseModel):
    user_id: int = Field(...)
    dorm_id: int = Field(...)
    room: str = Field(...)
    description: str = Field(...)
    
    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "user_id": 1,
                "dorm_id": 1,
                "room": "101",
                "description": "Заходите чаще туда"
            }
        }
        