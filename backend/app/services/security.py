from fastapi import Security, HTTPException
from fastapi.security import APIKeyHeader

from app.services.config import API_KEY

api_key_header = APIKeyHeader(
    name="X-API-KEY",
    description="API Key for authentication"
)


def verify_api_key(
    api_key: str = Security(
        api_key_header
    )
):

    if api_key != API_KEY:

        raise HTTPException(
            status_code=401,
            detail="Invalid API Key"
        )

    return api_key
