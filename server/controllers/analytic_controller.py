from typing import Annotated
from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
from database import get_db
from services.analytic_service import overview_analytic, distribution_analytic, by_type_analytic, trends_analytic
from uuid import UUID

from utils.handle_JWTtoken import get_current_dataset_id

router = APIRouter(
    prefix="/analytic",
    tags=["analytic"]
)

db_dependency = Annotated[Session, Depends(get_db)]
# dataset_id = UUID("9fdacf08-86af-405e-bed3-0d18ee2d630e")
@router.get("/overview", status_code=status.HTTP_200_OK)
def overview(db: db_dependency, dataset_id: str = Depends(get_current_dataset_id)):
    # dataset_id: str = Depends(get_current_dataset_id)
    print(f"dataset_id from request! {dataset_id}")
    try:
        return overview_analytic(db, dataset_id)
    except SQLAlchemyError:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database error")

@router.get("/distribution", status_code=status.HTTP_200_OK)
def distribution(db: db_dependency, dataset_id: str = Depends(get_current_dataset_id)):
    # dataset_id: str = Depends(get_current_dataset_id)
    # token: str = Depends(get_access_token) ---> do not use this
    print(f"dataset_id from request! {dataset_id}")
    try:
        return distribution_analytic(db, dataset_id)
    except SQLAlchemyError:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database error")

@router.get("/by_type", status_code=status.HTTP_200_OK)
def by_type(db: db_dependency):
    # dataset_id: str = Depends(get_current_dataset_id)
    # print(f"token from request! {token}")
    try:
        return by_type_analytic(db)
    except SQLAlchemyError:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database error")

@router.get("/trends", status_code=status.HTTP_200_OK)
def trends(db: db_dependency, dataset_id: str = Depends(get_current_dataset_id)):
    # dataset_id: str = Depends(get_current_dataset_id)
    print(f"dataset_id from request! {dataset_id}")
    try:
        return trends_analytic(db, dataset_id)
    except SQLAlchemyError:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database error")