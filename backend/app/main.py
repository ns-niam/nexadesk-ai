from fastapi import FastAPI, Query

from app.services.config import GEMINI_API_KEY
from app.services.gemini_service import ask_gemini
from app.models.chat import ChatRequest, ChatResponse

app = FastAPI(
    title="NexaDesk AI",
    version="0.1.0"
)

@app.get("/")
def root():
    return {
        "project": "NexaDesk AI",
        "status": "running"
    }

@app.get("/health")
def health():
    return {
        "health": "ok"
    }

@app.get("/config")
def config():
    return {
        "gemini_key_loaded": GEMINI_API_KEY is not None
    }

@app.get("/ask")
def ask(message: str = Query(...)):
    response = ask_gemini(message)

    return {
        "user_message": message,
        "response": response
    }

@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):

    ai_response = ask_gemini(
        request.message
    )

    return ChatResponse(
        response=ai_response
    ) 
