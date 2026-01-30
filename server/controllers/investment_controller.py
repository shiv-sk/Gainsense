from typing import Annotated
from fastapi import APIRouter, status, UploadFile, File, Depends
from sqlalchemy.orm import Session

from database import get_db
from services.investment_service import validate_investment_dataset

router = APIRouter(
    prefix="/investment",
    tags=["investment"]
)

db_dependency = Annotated[Session, Depends(get_db)]
@router.post("/upload", status_code=status.HTTP_201_CREATED)
async def investment_data_upload(file: Annotated[UploadFile, File(...)], db: db_dependency):
    return await validate_investment_dataset(file, db)