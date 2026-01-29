import uuid
from fastapi import HTTPException

from dotenv import load_dotenv
import os
from datetime import datetime, timedelta, timezone
from jose import jwt

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"

def create_access_token(dataset_id: uuid, expires_in_minutes: int = 60)-> str:
    payload = {
        "dataset_id": str(dataset_id),
        "exp": datetime.now(timezone.utc) + timedelta(minutes=expires_in_minutes),
        "scope": "dataset_access"
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token

def get_dataset_id_access_token(token: str)-> str:
    payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
    dataset_id = payload.get("dataset_id")
    if not dataset_id:
        raise HTTPException(status_code=403, detail="Invalid token")
    return dataset_id

def execute_graph(token: str):
    dataset_id = get_dataset_id_access_token(token)
    return {"dataset_id": dataset_id}