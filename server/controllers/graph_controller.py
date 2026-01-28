from fastapi import APIRouter
from services.graph_service import execute_graph

router = APIRouter(
    prefix="/graph",
    tags=["graph"]
)

@router.get("/")
def get_graph():
    return execute_graph()