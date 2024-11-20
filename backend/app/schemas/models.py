from pydantic import BaseModel, Field, EmailStr
from sqlalchemy.ext.declarative import declarative_base
from typing import Optional
from enum import Enum
from datetime import datetime
import re

class UserSchema(BaseModel): # TODO add validation
    first_name: str = Field(..., min_length=2, max_length=50)
    second_name: str = Field(..., min_length=2, max_length=50)
    third_name: Optional[str] = Field(None, min_length=2, max_length=50)
    number: str = Field(..., min_length=2, max_length=11)
    password: str = Field(..., min_length=8, max_length=64)
    
    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "first_name": "Ivan",
                "second_name": "Ivanov",
                "third_name": "Ivanovich",
                "number": "88005553535",
                "password": "example"
            }
        }


class ViolationSchema(BaseModel): # TODO: add validation
    user_id: int = Field(...)
    document_type: str = Field(...)
    violators_name: str = Field(...)
    violation_type: str = Field(...)
    description: str = Field(...)
    room: str = Field(...)
    witness: str = Field(...) # Свидетель блять
    
    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "user_id": 1,
                "document_type": "act",
                "violators_name": "Ivan",
                "violation_type": "smoke",
                "description": "example",
                "room": "example",
                "witness": "Klychkov Stepan 808-3"
            }
        }
        