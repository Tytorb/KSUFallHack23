from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from session import Base


class Container(Base):
    __tablename__ = "container"

    part_id = Column(Integer, primary_key=True, index=True)
    type = Column(String(50), unique=True)
    length = Column(Integer, primary_key=False, index=True)
    width = Column(Integer, primary_key=False, index=True)
    height = Column(Integer, primary_key=False, index=True)


class Item(Base):
    __tablename__ = "item"

    part_id = Column(Integer, primary_key=True, index=True)
    type = Column(String(50), unique=True)
    length = Column(Integer, primary_key=False, index=True)
    width = Column(Integer, primary_key=False, index=True)
    height = Column(Integer, primary_key=False, index=True)
