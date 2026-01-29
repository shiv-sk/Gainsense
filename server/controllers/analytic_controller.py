from fastapi import APIRouter, Depends
from services.analytic_service import execute_graph
from utils.handle_JWTtoken import get_access_token

router = APIRouter(
    prefix="/graph",
    tags=["graph"]
)

@router.get("/")
def get_graph(token: str = Depends(get_access_token)):
    print(f"token from request! {token}")
    return execute_graph(token)