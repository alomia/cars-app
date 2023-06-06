from beanie import Document
from pydantic import BaseModel, Field
from typing import Optional


class Car(Document):
    brand: str = Field(..., min_length=3)
    make: str = Field(..., min_length=3)
    year: int = Field(...)
    price: int = Field(...)
    km: int = Field(...)
    cm3: int = Field(...)

    class Settings:
        name = "cars"

    class Config:
        schema_extra = {
            "example": {
                "brand": "Ford",
                "make": "Mustang",
                "year": 2021,
                "price": 50000,
                "km": 1000,
                "cm3": 2000,
            }
        }


class CarUpdate(BaseModel):
    price: Optional[int] = None
