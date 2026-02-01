from typing import Annotated
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from services.analytic_service import overview_analytic, distribution_analytic, by_type_analytic
from utils.handle_JWTtoken import get_access_token

router = APIRouter(
    prefix="/analytic",
    tags=["analytic"]
)

db_dependency = Annotated[Session, Depends(get_db)]
@router.get("/overview")
def overview(db: db_dependency):
    # print(f"token from request! {token}")
    return overview_analytic(db)

@router.get("/distribution")
def distribution(db: db_dependency):
    # token: str = Depends(get_access_token)
    # print(f"token from request! {token}")
    return distribution_analytic(db)

@router.get("/by_type")
def by_type(db: db_dependency):
    # print(f"token from request! {token}")
    return by_type_analytic(db)