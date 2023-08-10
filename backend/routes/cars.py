from typing import List, Optional
from beanie import PydanticObjectId
from fastapi import APIRouter, Body, Depends, Query, HTTPException, status

from models.cars import Car, CarUpdate
from database.connection import Database
from auth.authenticate import authenticate

car_router = APIRouter(
    tags=["Car"]
)

car_database = Database(Car)


@car_router.get("/", response_description="List all cars", response_model=List[Car])
async def retrieve_all_car(min_price: int = Query(0), max_price: int = Query(100000), brand: Optional[str] = Query(None), page: int = Query(1, ge=1)) -> List[Car]:
    cars = await car_database.get_all(min_price=min_price, max_price=max_price, brand=brand, page=page)
    return cars


@car_router.get("/{id}", response_description="Get a single car")
async def retrieve_car(id: PydanticObjectId) -> Car:
    car = await car_database.get(id)
    if not car:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Car with supplied ID does not exist"
        )
    return car


@car_router.post("/", response_description="Add new car")
async def create_car(car: Car = Body(...), user: str = Depends(authenticate)) -> dict:
    await car_database.save(car)
    return {
        "message": "Car created successfully"
    }


@car_router.patch("/{id}", response_description="Update car")
async def updated_car(id: PydanticObjectId, car: CarUpdate = Body(...), user: str = Depends(authenticate)) -> Car:
    updated_car = await car_database.update(id, car)
    if not updated_car:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Car with supplied ID does not exist"
        )
    return updated_car


@car_router.delete("/{id}", response_description="Delete car")
async def delete_car(id: PydanticObjectId, user: str = Depends(authenticate)) -> dict:
    car = await car_database.delete(id)
    if not car:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Car with supplied ID does not exist"
        )
    return {
        "message": "Car deleted successfully."
    }
