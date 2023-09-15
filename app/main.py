from fastapi import FastAPI, HTTPException, Depends, status
from config import settings
from session import engine
from session import engine, SessionLocal
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Annotated

# from models import Container
# from models import Item
import models


def start_application():
    app = FastAPI(title=settings.PROJECT_NAME, version=settings.PROJECT_VERSION)
    return app


app = start_application()

models.Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]


class Container(BaseModel):
    part_id: int
    type: str
    length: int
    width: int
    height: int


# API Engpoints BELOW


@app.get("/")
def home():
    return {"msg": "nruh"}


@app.post("/container/", status_code=status.HTTP_201_CREATED)
async def part_id(part: Container, db: db_dependency):
    db_container = models.Container(**part.dict())
    db.add(db_container)
    db.commit()


# @app.get("/container/", status_code=status.HTTP_200_OK)
# async def read_part_id(container_id: int, db_dependency):
#     container = (
#         db.query(models.Container).filter(models.Container.id == container_id).first()
#     )
#     if container is None:
#         raise HTTPException(status_code=404, detail="No container existing")
#     return container


# issue is that get is breaking the rest of it. Error "Mapper Mapper[Container(container)] could not assemble any primary key columns for mapped table 'container'"
