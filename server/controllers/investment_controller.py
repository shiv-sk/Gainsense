from typing import Annotated
from fastapi import APIRouter, status, UploadFile, File, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from database import get_db
from services.investment_service import validate_investment_dataset, InvalidInvestmentRow
from utils.handle_JWTtoken import create_access_token

router = APIRouter(
    prefix="/investment",
    tags=["investment"]
)

db_dependency = Annotated[Session, Depends(get_db)]
MAX_FILE_SIZE = 1 * 1024 * 1024
@router.post("/upload", status_code=status.HTTP_201_CREATED)
async def investment_data_upload(file: Annotated[UploadFile, File(...)], response: Response, db: db_dependency):
    print("controller passed! ")
    allowed_file_type = ["text/csv"]
    if file.content_type not in allowed_file_type:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Only CSV files are allowed!")
    if file.size > MAX_FILE_SIZE:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="File size should be less than 1MB")
    try:
        dataset_id = await validate_investment_dataset(file, db)
        access_token = create_access_token(dataset_id)
        response.set_cookie(key="access_token", value=access_token, httponly=True, secure=True, samesite="lax", )
        return {"dataset_id": dataset_id, "access_token": access_token}
    except InvalidInvestmentRow as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))