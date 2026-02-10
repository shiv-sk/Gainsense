from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os
from sqlalchemy.orm import DeclarativeBase

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL, pool_pre_ping=True, pool_size=5, max_overflow=10)
session_local = sessionmaker(autocommit = False , autoflush = False , bind = engine)
class Base(DeclarativeBase):
    pass

def get_db():
    db = session_local()
    try:
        yield db
    finally:
        db.close()