from beanie import Document
from pydantic import EmailStr, Field
from enum import Enum


class Role(str, Enum):
    SALESPERSON = "SALESPERSON"
    ADMIN = "ADMIN"


class User(Document):
    username: str = Field(..., min_length=3, max_length=15)
    email: str = EmailStr(...)
    password: str = Field(...)
    role: Role

    class Settings:
        name = "users"
    
    class Config:
        schema_extra = {
            "example": {
                "username": "john",
                "email": "john@gmail.com",
                "password": "john123",
                "role": "SALESPERSON",
            }
        }
