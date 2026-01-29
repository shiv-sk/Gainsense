from typing import Annotated
from fastapi import APIRouter, status, UploadFile, File
from services.investment_service import validate_investment_dataset

router = APIRouter(
    prefix="/investment",
    tags=["investment"]
)

@router.post("/upload", status_code=status.HTTP_201_CREATED)
async def investment_data_upload(file: Annotated[UploadFile, File(...)]):
    validate_investment_response = await validate_investment_dataset(file)
    access_token = validate_investment_response["access_token"]
    return {"access_token": access_token}