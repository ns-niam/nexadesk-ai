from fastapi import FastAPI  # type: ignore[import]

from app.services.config import GEMINI_API_KEY
from app.services.gemini_service import ask_gemini

from app.services.intent_classifier import (
    classify_intent,
    extract_customer_data
)

from app.services.memory import chat_history
from app.services.customer_profile import customer_profile
from app.services.ticket_manager import create_ticket


app = FastAPI(
    title="NexaDesk AI",
    version="1.0.0"
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

    extract_customer_data(message)

    chat_history.append({
        "user": message
    })

    intent = classify_intent(message)

    if intent == "account_opening":

        response = (
            "To open a bank account, please provide your "
            "ID, phone number and proof of address."
        )

    elif intent == "loan_inquiry":

        response = (
            "Please specify whether you need a personal, "
            "home, education, business, or auto loan."
        )

    elif intent == "credit_card_support":

        response = (
            "We offer multiple credit card options. "
            "Please provide your monthly income range."
        )

    elif intent == "debit_card_support":

        response = (
            "I can help with debit card activation, "
            "replacement, PIN reset, or lost cards."
        )

    elif intent == "money_transfer":

        response = (
            "Please provide the transfer type: "
            "local, international, or internal transfer."
        )

    elif intent == "balance_inquiry":

        response = (
            "For security reasons, account balance "
            "information requires customer authentication."
        )

    elif intent == "branch_information":

        response = (
            "Please provide your city or location "
            "to find the nearest branch."
        )

    elif intent == "online_banking_support":

        response = (
            "I can assist with online banking login, "
            "password reset, and mobile banking issues."
        )

    elif intent == "card_security":

        response = (
            "Your card security request has been prioritized. "
            "Please contact support immediately if your card "
            "is lost or stolen."
        )

    elif intent == "human_handoff":

        ticket_id = create_ticket()

        response = (
            f"Your request has been forwarded to a human agent. "
            f"Ticket ID: {ticket_id}"
        )

    else:

        response = ask_gemini(message)

    chat_history.append({
        "assistant": response
    })

    return {
        "intent": intent,
        "response": response
    }


@app.get("/history")
def history():

    return {
        "history": chat_history
    }


@app.get("/profile")
def profile():

    return customer_profile