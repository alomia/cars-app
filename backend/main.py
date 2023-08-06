from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.connection import Settings
from routes.cars import car_router
from routes.users import user_router

import uvicorn

app = FastAPI()

settings = Settings()

# register origins

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:8080",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes

app.include_router(car_router, prefix="/car")
app.include_router(user_router, prefix="/user")


@app.on_event("startup")
async def init_db():
    await settings.initialize_database()


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)
