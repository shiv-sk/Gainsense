from typing import Annotated
from fastapi import UploadFile, File, HTTPException, status
import csv
from datetime import  datetime
from io import StringIO
import uuid

from utils.handle_JWTtoken import create_access_token


def parse_row(row: dict):
    if not row:
        return None
    try:
        return_percent = float(row["return_percent"])
    except KeyError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Invalid row format {row}")
    if return_percent < -100:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="return percent cannot be less than -100%")
    try:
        return {
            "investment_type": row["investment_type"],
            "investment_amount": float(row["investment_amount"]),
            "investment_date": datetime.strptime(row["investment_date"], "%Y-%m-%d"),
            "return_percent": float(row["return_percent"])/100
        }
    except KeyError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Invalid row format {row}")


async def validate_investment_dataset(file: Annotated[UploadFile, File(...)]):
    allowed_file_type = ["text/csv"]
    if file.content_type not in allowed_file_type:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Only CSV files are allowed!")
    content = await file.read()
    try:
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
    print(f"dataset_id is! {dataset_id}")
    access_token = create_access_token(dataset_id)
    return {"final rows": rows, "access_token": access_token}
