from fastapi import FastAPI  # type: ignore[import]
from app.services.config import GEMINI_API_KEY
from app.services.gemini_service import ask_gemini

app = FastAPI(
    title="NexaDesk AI"
)

@app.get("/")
def root():
    return {
        "project": "NexaDesk AI",
        "status": "running"
    }

@app.get("/config-check")
def config_check():
    return {
        "gemini_loaded": GEMINI_API_KEY is not None
    }

@app.get("/ask")
def ask(message: str):

    response = ask_gemini(message)

    return {
        "user_message": message,
        "response": response
    }