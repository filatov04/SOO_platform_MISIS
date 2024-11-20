from pydantic import BaseModel, Field, EmailStr
from sqlalchemy.ext.declarative import declarative_base
from typing import Optional
from enum import Enum
from datetime import datetime
        
class UserLoginSchema(BaseModel): # TODO: fix email or phone
    email: EmailStr = Field(...)
    password: str = Field(..., min_length=8, max_length=64)

    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "email": "example@example.com",
                "password": "example"
            }
        }


# class UserSessionSchema(BaseModel): ???
#     id_session: int = Field(...)
#     id_user: int = Field(...)
#     refresh_token: str = Field(...)
#     expires_at: datetime = Field(...)
#     created_at: datetime = Field(...)
#     last_used_at: datetime = Field(...)
    
#     class Config:
#         orm_mode = True
#         schema_extra = {
#             "example": {
#                 "id_session": 1,
#                 "id_user": 1,
#                 "refresh_token": "token",
#                 "expires_at": "2024-20-07 13:00:00.956741",
#                 "created_at": "2024-10-07 13:00:00.956741",
#                 "last_used_at": "2024-10-07 13:00:00.956741"
#             }
#         }
        
class UserSessionUpdateSchema(BaseModel):
    access_token: str = Field(...)
    expires_at: float = Field(...)
    refresh_token: str = Field(...)
    token_type: str = Field("Bearer")
    
    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "access_token": "token",
                "expires_at": "12234.4324",
                "refresh_token": "token",
                "token_type": "Bearer",
            }
        }