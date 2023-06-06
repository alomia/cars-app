from typing import Optional
from beanie import init_beanie
from pydantic import BaseSettings
from motor.motor_asyncio import AsyncIOMotorClient

from models.cars import Car


class Settings(BaseSettings):
    DATABASE_URL: Optional[str] = None

    async def initialize_database(self):
        client = AsyncIOMotorClient(self.DATABASE_URL)
        await init_beanie(database=client.get_default_database(), document_models=[Car])

    class Config:
        env_file = ".env"
