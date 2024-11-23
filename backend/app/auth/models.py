from pydantic import BaseModel, Field, EmailStr
from sqlalchemy.ext.declarative import declarative_base
from typing import Optional
from enum import Enum
from datetime import datetime
        
class UserLoginSchema(BaseModel):
    phone: str = Field(..., min_length=2, max_length=50)
    password: str = Field(..., min_length=4, max_length=64)

    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "phone": "78005553535",
                "password": "example"
            }
        }