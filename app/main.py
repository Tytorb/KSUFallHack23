from fastapi import FastAPI, HTTPException, Depends, status, Response
from config import settings
from session import engine
from session import engine, SessionLocal
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Annotated
import models
from fastapi.middleware.cors import CORSMiddleware


origins = [
    "http://localhost:3000",
]


def start_application():
    app = FastAPI(title=settings.PROJECT_NAME, version=settings.PROJECT_VERSION)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
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
    length: float
    width: float
    height: float


class Item(BaseModel):
    part_id: int
    type: str
    length: float
    width: float
    height: float


@app.get("/")
def home():
    return {"msg": "nruh"}


@app.post("/container/", status_code=status.HTTP_201_CREATED)
async def part_id(part: Container, db: db_dependency):
    db_container = models.Container(**part.dict())
    db.add(db_container)
    db.commit()


class ContainerResponseSchema(BaseModel):
    part_id: int
    type: str
    length: float
    width: float
    height: float


@app.get(
    "/container/",
    response_model=ContainerResponseSchema,
    status_code=status.HTTP_200_OK,
)
async def read_part_id(part_id: int, db: Session = Depends(get_db)):
    container = (
        db.query(models.Container).filter(models.Container.part_id == part_id).first()
    )
    if container is None:
        raise HTTPException(status_code=404, detail="No container existing")

    response_model_instance = ContainerResponseSchema(**container.__dict__)

    return response_model_instance


@app.post("/item/", status_code=status.HTTP_201_CREATED)
async def part_id(part: Item, db: db_dependency):
    db_container = models.Item(**part.dict())
    db.add(db_container)
    db.commit()


@app.get(
    "/item/",
    response_model=ContainerResponseSchema,
    status_code=status.HTTP_200_OK,
)
async def read_part_id(part_id: int, db: Session = Depends(get_db)):
    item = db.query(models.Item).filter(models.Item.part_id == part_id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="No container existing")

    response_model_instance = ContainerResponseSchema(**item.__dict__)

    return response_model_instance


class ContainerResponseSchema(BaseModel):
    part_id: int
    type: str
    length: float
    width: float
    height: float
