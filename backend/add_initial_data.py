import csv
import asyncio
from pathlib import Path

from models.cars import Car
from database.connection import Database, Settings


async def add_initial_data():
    # Initializes the connection to the database
    settings = Settings()
    await settings.initialize_database()

    # Creates an instance of the Database class
    car_database = Database(Car)

    # Read CSV file
    csv_path = Path("data.csv")

    with csv_path.open(mode="r") as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            car_instance = Car(**row)
            await car_database.save(car_instance)

    print("Initial data added correctly")

# Ejecuta la función asincrónica utilizando asyncio.run()
asyncio.run(add_initial_data())

