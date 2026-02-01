from uuid import UUID
from fastapi import HTTPException, status
from sqlalchemy import select, func
from sqlalchemy.orm import Session

from models.invest_model import Investment
from utils.handle_JWTtoken import get_dataset_id_access_token

dataset_id = UUID("9fdacf08-86af-405e-bed3-0d18ee2d630e")
def overview_analytic(db: Session):
    # if not token:
    #     raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    # dataset_id = get_dataset_id_access_token(token)

    stmt1 = (
        select(
                  func.sum(Investment.investment_amount).label("total_invested"),
                  func.sum(Investment.investment_amount * Investment.return_percent)
                  .label("overall_profit_loss"),
                  func.max(Investment.return_percent).label("highest_returns"),
                  func.min(Investment.return_percent).label("lowest_returns")
        ).where(Investment.dataset_id == dataset_id)
    )
    over_result = db.execute(stmt1).one()
    profit_loss = (Investment.return_percent * Investment.investment_amount).label("profit_loss")
    stmt2 = (
        select(
            Investment.investment_type, Investment.investment_amount, Investment.return_percent,
            profit_loss
        ).where(Investment.dataset_id == dataset_id).order_by(profit_loss)
    )
    table_result = db.execute(stmt2).mappings().all()
    return {
        "total_invested": over_result.total_invested,
        "overall_profit_loss": over_result.overall_profit_loss,
        "highest_returns": over_result.highest_returns,
        "lowest_returns": over_result.lowest_returns,
        "table": table_result
    }

def distribution_analytic(db: Session):
    total_invested = func.sum(Investment.investment_amount).label('total_invested')
    stmt = select(Investment.investment_type,
                  total_invested
                  ).where(Investment.dataset_id == dataset_id).group_by(Investment.investment_type).order_by(total_invested)
    results = db.execute(stmt).mappings().all()
    return results

def by_type_analytic(db: Session):
    total_invested = func.sum(Investment.investment_amount).label('total_invested')
    profit_loss = func.sum(Investment.investment_amount * Investment.return_percent).label('profit_loss')
    avg_returns = (func.sum(Investment.investment_amount * Investment.return_percent) / func.sum(Investment.investment_amount)).label('Avg_returns')
    stmt = select(Investment.investment_type, total_invested, profit_loss, avg_returns).where(Investment.dataset_id == dataset_id).group_by(Investment.investment_type).order_by(profit_loss)
    results = db.execute(stmt).mappings().all()
    return results