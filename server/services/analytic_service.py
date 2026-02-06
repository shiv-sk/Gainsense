from uuid import UUID
from fastapi import HTTPException, status
from fastapi.logger import logger
from sqlalchemy import select, func
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from models.invest_model import Investment
from utils.handle_JWTtoken import get_dataset_id_access_token

dataset_id = UUID("9fdacf08-86af-405e-bed3-0d18ee2d630e")
def overview_analytic(db: Session):
    try:
        # dataset_id = get_dataset_id_access_token(token)

        stmt1 = (
            select(
                func.sum(Investment.investment_amount).label("total_invested"),
                func.sum(Investment.investment_amount * Investment.return_percent).label("net_profit_loss"),
                func.max(Investment.return_percent * Investment.investment_amount).label("single_investment_highest_profit"),
                func.min(Investment.return_percent * Investment.investment_amount).label("single_investment_lowest_profit")
            ).where(Investment.dataset_id == dataset_id)
        )
        over_result = db.execute(stmt1).one()
        net_profit_loss = (Investment.return_percent * Investment.investment_amount).label("net_profit_loss")
        stmt2 = (
            select(
                Investment.investment_type, Investment.investment_amount, Investment.return_percent,
                net_profit_loss
            ).where(Investment.dataset_id == dataset_id).order_by(net_profit_loss)
        )
        table_result = db.execute(stmt2).mappings().all()
        return {
            "total_invested": over_result.total_invested,
            "overall_profit_loss": over_result.overall_profit_loss,
            "single_highest_profit": over_result.single_highest_profit,
            "single_lowest_profit": over_result.single_lowest_profit,
            "table": table_result
        }
    except SQLAlchemyError as e:
        db.rollback()
        logger.error(e)
        raise

def distribution_analytic(db: Session):
    try:
        # dataset_id = get_dataset_id_access_token(token)
        total_invested_per_type = func.sum(Investment.investment_amount).label('total_invested_per_type')
        avg_returns_per_type = (func.sum(Investment.investment_amount * Investment.return_percent) /
                                func.sum(Investment.investment_amount)).label('Avg_returns_per_type')
        stmt = (
            select(
                Investment.investment_type,
                func.sum(Investment.investment_amount * Investment.return_percent).label('profit_loss_per_type'),
                total_invested_per_type,
                avg_returns_per_type
            )
            .where(Investment.dataset_id == dataset_id)
            .group_by(Investment.investment_type)
            .order_by(total_invested_per_type)
        )
        results = db.execute(stmt).mappings().all()
        return results
    except SQLAlchemyError as e:
        db.rollback()
        logger.error(e)
        raise

def by_type_analytic(db: Session):
    try:
        # dataset_id = get_dataset_id_access_token(token)
        total_invested_per_type = func.sum(Investment.investment_amount).label('total_invested_per_type')
        profit_loss_per_type = (func.sum(Investment.investment_amount * Investment.return_percent)
                                .label('profit_loss_per_type'))
        avg_returns_per_type = (func.sum(Investment.investment_amount * Investment.return_percent) /
                       func.sum(Investment.investment_amount)).label('Avg_returns_per_type')
        stmt = (
            select(
                Investment.investment_type, total_invested_per_type, profit_loss_per_type, avg_returns_per_type
            )
            .where(Investment.dataset_id == dataset_id)
            .group_by(Investment.investment_type)
            .order_by(profit_loss_per_type)
        )
        results = db.execute(stmt).mappings().all()
        return results
    except SQLAlchemyError as e:
        db.rollback()
        logger.error(e)
        raise

def trends_analytic(db: Session):
    try:
        # dataset_id = get_dataset_id_access_token(token)
        total_invested_per_year = func.sum(Investment.investment_amount).label('total_invested_per_year')
        profit_loss_per_year = (func.sum(Investment.investment_amount * Investment.return_percent)
                                .label('profit_loss_per_year'))
        year_wise = func.to_char(Investment.investment_date, 'YYYY').label('year_wise')
        stmt = (
            select(year_wise, profit_loss_per_year, total_invested_per_year)
            .where(Investment.dataset_id == dataset_id)
            .group_by(year_wise)
            .order_by(year_wise)
        )
        results = db.execute(stmt).mappings().all()
        if len(results) == 0:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return results
    except SQLAlchemyError as e:
        db.rollback()
        logger.error(e)
        raise