from typing import Any, Optional, List
from beanie import init_beanie, PydanticObjectId
from pydantic import BaseSettings, BaseModel
from motor.motor_asyncio import AsyncIOMotorClient

from models.cars import Car
from models.users import User


class Settings(BaseSettings):
    DATABASE_URL: Optional[str] = None

    async def initialize_database(self):
        client = AsyncIOMotorClient(self.DATABASE_URL)
        await init_beanie(database=client.get_default_database(), document_models=[Car, User])

    class Config:
        env_file = ".env"


class Database:
    def __init__(self, model):
        self.model = model

    async def save(self, document):
        await document.create()
        return

    async def get(self, id: PydanticObjectId) -> bool:
        doc = await self.model.get(id)
        if doc:
            return doc
        return False

    async def get_all(self, min_price: int, max_price: int, brand: Optional[str], page: int) -> List[Any]:
        results_per_page = 25
        skip = (page-1) * results_per_page
        query = {"price": {"$gte": min_price, "$lte": max_price}}
        if brand:
            query["brand"] = brand
        docs = await self.model.find(query).skip(skip).limit(results_per_page).to_list()
        return docs

    async def update(self, id: PydanticObjectId, body: BaseModel) -> Any:
        doc_id = id
        des_body = body.dict()

        des_body = {k: v for k, v in des_body.items() if v is not None}
        update_query = {"$set": {
            field: value for field, value in des_body.items()
        }}

        doc = await self.get(doc_id)
        if not doc:
            return False
        await doc.update(update_query)
        return doc

    async def delete(self, id: PydanticObjectId) -> bool:
        doc = await self.get(id)
        if not doc:
            return False
        await doc.delete()
        return True
