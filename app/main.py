from fastapi import FastAPI
from config import settings
from session import engine
from base_class import Base


def create_tables():
    Base.metadata.create_all(bind=engine)


def start_application():
    app = FastAPI(title=settings.PROJECT_NAME, version=settings.PROJECT_VERSION)
    create_tables()
    return app


app = start_application()


@app.get("/")
def home():
    return {"msg": "Hello FastAPI🚀"}


# from fastapi import FastAPI
# app = FastAPI()

# @app.get("/")
# async def root():
#     return {"greeting": "Hello world"}
