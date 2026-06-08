from fastapi import FastAPI  # type: ignore[import]
from app.services.config import GEMINI_API_KEY
from app.services.gemini_service import ask_gemini
from app.services.intent_classifier import classify_intent

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

    intent = classify_intent(message)

    if intent == "account_opening":

        return {
            "intent": intent,
            "response":
            "To open a bank account, please provide your ID, phone number and proof of address."
        }

    elif intent == "loan_inquiry":

        return {
            "intent": intent,
            "response":
            "Our loan department can help you. Please specify whether you need a personal, home, education or business loan."
        }

    elif intent == "credit_card_support":

        return {
            "intent": intent,
            "response":
            "We offer multiple credit card options. Please tell us your monthly income range."
        }

    response = ask_gemini(message)

    return {
        "intent": intent,
        "response": response
    }