from typing import Annotated
from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
from database import get_db
from services.analytic_service import overview_analytic, distribution_analytic, by_type_analytic, trends_analytic

router = APIRouter(
    prefix="/analytic",
    tags=["analytic"]
)

db_dependency = Annotated[Session, Depends(get_db)]
@router.get("/overview")
def overview(db: db_dependency):
    # dataset_id: str = Depends(get_current_dataset_id)
    # print(f"token from request! {token}")
    try:
        return overview_analytic(db)
    except SQLAlchemyError:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database error")

@router.get("/distribution")
def distribution(db: db_dependency):
    # dataset_id: str = Depends(get_current_dataset_id)
    # token: str = Depends(get_access_token) ---> do not use this
    # print(f"token from request! {token}")
    try:
        return distribution_analytic(db)
    except SQLAlchemyError:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database error")

@router.get("/by_type")
def by_type(db: db_dependency):
    # dataset_id: str = Depends(get_current_dataset_id)
    # print(f"token from request! {token}")
    try:
        return by_type_analytic(db)
    except SQLAlchemyError:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database error")

@router.get("/trends")
def trends(db: db_dependency):
    # dataset_id: str = Depends(get_current_dataset_id)
    # print(f"token from request! {token}")
    try:
        return trends_analytic(db)
    except SQLAlchemyError:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database error")