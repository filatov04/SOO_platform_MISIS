from pydantic import BaseModel, Field, EmailStr
from sqlalchemy.ext.declarative import declarative_base
from typing import Optional
from enum import Enum
from datetime import datetime
        
class UserLoginSchema(BaseModel):
    login: str = Field(..., min_length=2, max_length=50)
    password: str = Field(..., min_length=8, max_length=64)

    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "login": "example",
                "password": "example"
            }
        }
