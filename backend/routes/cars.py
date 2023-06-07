from typing import List
from beanie import PydanticObjectId
from fastapi import APIRouter, Body, Query, HTTPException, status

from models.cars import Car
from database.connection import Database

car_router = APIRouter(
    tags=["Car"]
)

car_database = Database(Car)


@car_router.get("/", response_description="List all cars", response_model=List[Car])
async def retrieve_all_car(page: int = Query(1, ge=1)) -> List[Car]:
    cars = await car_database.get_all(page=page)
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
async def create_car(car: Car = Body(...)) -> dict:
    await car_database.save(car)
    return {
        "message": "Car created successfully"
    }


@car_router.put("/{id}", response_description="Update car")
async def updated_car(id: PydanticObjectId, car: Car = Body(...)) -> Car:
    updated_car = await car_database.update(id, car)
    if not updated_car:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Car with supplied ID does not exist"
        )
    return updated_car


@car_router.delete("/{id}", response_description="Delete car")
async def delete_car(id: PydanticObjectId) -> dict:
    car = await car_database.delete(id)
    if not car:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Car with supplied ID does not exist"
        )
    return {
        "message": "Car deleted successfully."
    }
