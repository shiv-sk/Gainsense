import uuid
from typing import Optional
from fastapi import HTTPException, Request, Depends, status
from dotenv import load_dotenv
import os
from datetime import datetime, timedelta, timezone
from fastapi.security import APIKeyHeader
from jose import jwt, ExpiredSignatureError, JWTError

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"

api_key_scheme = APIKeyHeader(name="Authorization", auto_error=False)

def create_access_token(dataset_id: uuid, expires_in_minutes: int = 60)-> str:
    payload = {
        "dataset_id": str(dataset_id),
        "exp": datetime.now(timezone.utc) + timedelta(minutes=expires_in_minutes),
        "scope": "dataset_access"
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token

def get_access_token(request: Request, auth_header: Optional[str] = Depends(api_key_scheme))->str:
    if auth_header and auth_header.startswith("Bearer "):
        return auth_header.split(" ", 1)[1]
    token = request.cookies.get("access_token")
    if token:
        return token
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="token not found00000!")

def get_dataset_id_access_token(token: str)-> str:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
        dataset_id = payload.get("dataset_id")
        if not dataset_id:
            raise HTTPException(status_code=403, detail="Invalid token")
        return dataset_id
    except ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired")
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

def get_current_dataset_id(token: str = Depends(get_access_token))-> str:
    return get_dataset_id_access_token(token)