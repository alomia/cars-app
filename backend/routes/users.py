from fastapi import APIRouter, Body, HTTPException, status

from models.users import User
from database.connection import Database
from auth.hash_password import HashPassword

user_router = APIRouter(
    tags=["User"],
)

user_database = Database(User)
hash_password = HashPassword()


@user_router.post("/signup", response_description="Register user")
async def sign_user_up(user: User = Body(...)) -> dict:
    user_exist = await User.find_one(User.email == user.email)

    if user_exist:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User with email provided exists already.",
        )

    hashed_password = hash_password.create_hash(user.password)
    user.password = hashed_password
    await user_database.save(user)

    return {"message": "User created successfully"}
