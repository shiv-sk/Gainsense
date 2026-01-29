from sqlalchemy import String, Float, Date
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from uuid import UUID
from datetime import date

class Base(DeclarativeBase):
    pass

class Investment(Base):
    __tablename__ = "investments"
    id: Mapped[int] = mapped_column(primary_key=True)
    dataset_id: Mapped[UUID] = mapped_column(nullable=False, index=True)
    investment_type: Mapped[str] = mapped_column(String(100), nullable=False)
    investment_amount: Mapped[float] = mapped_column(Float, nullable=False)
    investment_date: Mapped[date] = mapped_column(Date, nullable=False)
    return_percent: Mapped[float] = mapped_column(Float, nullable=False)