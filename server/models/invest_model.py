from sqlalchemy import String, Date, Numeric
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from uuid import UUID
from datetime import date
from decimal import Decimal
from database import Base


class Investment(Base):
    __tablename__ = "investments"
    id: Mapped[int] = mapped_column(primary_key=True)
    dataset_id: Mapped[UUID] = mapped_column(nullable=False, index=True)
    investment_type: Mapped[str] = mapped_column(String(100), nullable=False)
    investment_amount: Mapped[Decimal] = mapped_column(Numeric(12, 2), nullable=False)
    investment_date: Mapped[date] = mapped_column(Date, nullable=False)
    return_percent: Mapped[Decimal] = mapped_column(Numeric(6, 4), nullable=False)