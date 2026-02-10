from fastapi import UploadFile, HTTPException, status
import csv
from datetime import  datetime
from io import StringIO
import uuid
from sqlalchemy import insert
from sqlalchemy.orm import Session
from models.invest_model import Investment

class InvalidInvestmentRow(Exception):
    pass

def parse_row(row: dict):
    if not row:
        return None
    try:
        return_percent = float(row["return_percent"])
        if return_percent < -100:
            raise InvalidInvestmentRow("return percent cannot be less than -100%")
        return {
            "investment_type": row["investment_type"],
            "investment_amount": float(row["investment_amount"]),
            "investment_date": datetime.strptime(row["investment_date"], "%Y-%m-%d"),
            "return_percent": float(row["return_percent"]) / 100
        }
    except (KeyError, ValueError) as e:
        raise InvalidInvestmentRow(f'missing {str(e)}')


async def validate_investment_dataset(file: UploadFile, db: Session):
    try:
        content = await file.read()
        text = content.decode("utf-8")
    except UnicodeDecodeError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="CSV must be UTF-8 encoded")

    rows = []
    csv_reader = csv.DictReader(StringIO(text))
    for row in csv_reader:
        parsed = parse_row(row)
        if parsed:
            rows.append(parsed)
    dataset_id = uuid.uuid4()
    if len(rows) == 0:
        raise ValueError("At least one valid row is required")
    for row in rows:
        row["dataset_id"] = dataset_id
    stmt = insert(Investment).values(rows)
    db.execute(stmt)
    db.commit()
    return dataset_id