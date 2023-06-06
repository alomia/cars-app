from fastapi import FastAPI

from database.connection import Settings

import uvicorn

app = FastAPI()

settings = Settings()


@app.on_event("startup")
async def init_db():
    await settings.initialize_database()


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)
