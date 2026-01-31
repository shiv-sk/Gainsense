from uuid import UUID
from fastapi import HTTPException, status
from sqlalchemy import select, func
from sqlalchemy.orm import Session

from models.invest_model import Investment
from utils.handle_JWTtoken import get_dataset_id_access_token


def overview_analytic(db: Session):
    # if not token:
    #     raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    # dataset_id = get_dataset_id_access_token(token)
    dataset_id = UUID("9fdacf08-86af-405e-bed3-0d18ee2d630e")
    stmt = (
        select(
                  func.sum(Investment.investment_amount).label("total_invested"),
                  func.sum(Investment.investment_amount + Investment.investment_amount * Investment.return_percent)
                  .label("overall_profit_loss"),
                  func.max(Investment.return_percent).label("highest_returns"),
                  func.min(Investment.return_percent).label("lowest_returns")
        ).where(Investment.dataset_id == dataset_id)
    )
    result = db.execute(stmt).one()
    print(f"result is {result}")
    return {
        "total_invested": result.total_invested,
        "overall_profit_loss": result.overall_profit_loss,
        "highest_returns": result.highest_returns,
        "lowest_returns": result.lowest_returns,
    }