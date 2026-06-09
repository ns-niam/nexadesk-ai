from fastapi import FastAPI
from app.services.database import search_customer
from app.services.session_manager import create_session
from app.services.config import GEMINI_API_KEY
from app.services.gemini_service import ask_gemini
from app.services.intent_classifier import (
    classify_intent,
    extract_customer_data
)

from app.services.knowledge_base import (
    load_default_faqs
)
from app.services.memory import chat_history
from app.services.customer_profile import customer_profile
from app.services.ticket_manager import create_ticket
from app.models.chat import (
    ChatRequest,
    ChatResponse
)

from app.services.database import (
    get_loan_customers,
    get_credit_card_customers
)

from app.services.database import (
    save_message,
    get_chat_history,
    search_faq,
    save_ticket,
    save_customer
)

from app.services.database import (
    get_total_messages,
    get_total_customers,
    get_total_tickets
)


# app config

app = FastAPI(
    title="NexaDesk AI",
    version="1.0.0"
)

load_default_faqs()

# basic endpoints

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


# legacy chat endpoint

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


# session management

@app.get("/new-session")
def new_session():

    session_id = create_session()

    return {
        "session_id": session_id
    }


# production chat endpoint

@app.post("/chat")
def chat(request: ChatRequest):

    session_id = request.session_id
    message = request.message

    extract_customer_data(message)

    # customer persistence

    if customer_profile["name"]:

        save_customer(
            customer_profile["name"],
            customer_profile["loan_interest"],
            customer_profile["credit_card_interest"]
        )

    save_message(
        session_id,
        "user",
        message
    )

    # faq retrieval

    faq_answer = search_faq(message)

    if faq_answer:

        save_message(
            session_id,
            "assistant",
            faq_answer
        )

        return ChatResponse(
            session_id=session_id,
            intent="faq_response",
            response=faq_answer
        )

    # intent classification

    intent = classify_intent(message)

    if intent == "account_opening":

        response = (
            "To open a bank account, please provide "
            "your ID, phone number and proof of address."
        )

    elif intent == "loan_inquiry":

        response = (
            "Please specify whether you need a personal, "
            "home, education, business, or auto loan."
        )

    elif intent == "credit_card_support":

        response = (
            "Please provide your monthly income range."
        )

    elif intent == "debit_card_support":

        response = (
            "Please provide your account number "
            "to request a new debit card."
        )

    elif intent == "card_security":

        response = (
            "Your card security request has been "
            "prioritized. Please block your card "
            "immediately and contact support."
        )

    elif intent == "balance_inquiry":

        response = (
            "For security reasons, balance inquiries "
            "require customer authentication."
        )

    elif intent == "money_transfer":

        response = (
            "Please provide transfer details "
            "including recipient account information."
        )

    elif intent == "branch_information":

        response = (
            "Please provide your city "
            "to find the nearest branch."
        )

    elif intent == "online_banking_support":

        response = (
            "Please describe your online banking issue."
        )

    elif intent == "human_handoff":

        ticket_id = create_ticket()

        save_ticket(
            ticket_id,
            session_id,
            "human_handoff"
        )

        response = (
            f"Human agent requested. "
            f"Ticket ID: {ticket_id}"
        )

    else:

        response = ask_gemini(message)

    save_message(
        session_id,
        "assistant",
        response
    )

    return ChatResponse(
        session_id=session_id,
        intent=intent,
        response=response
    )


# database history

@app.get("/db-history")
def db_history(session_id: str):

    return {
        "history": get_chat_history(session_id)
    }


# profile

@app.get("/profile")
def profile():

    return customer_profile


# memory history

@app.get("/history")
def history():

    return {
        "history": chat_history
    }

# analytics

@app.get("/analytics")
def analytics():

    return {
        "total_messages": get_total_messages(),
        "total_customers": get_total_customers(),
        "total_tickets": get_total_tickets()
    }

# customers

@app.get("/customers")
def customers():

    from app.services.database import cursor

    cursor.execute(
        """
        SELECT *
        FROM customers
        """
    )

    return {
        "customers": cursor.fetchall()
    }

# tickets

@app.get("/tickets")
def tickets():

    from app.services.database import cursor

    cursor.execute(
        """
        SELECT *
        FROM tickets
        """
    )

    return {
        "tickets": cursor.fetchall()
    }

# admin analytics

@app.get("/admin/analytics")
def admin_analytics():

    return {
        "total_messages": get_total_messages(),
        "total_customers": get_total_customers(),
        "total_tickets": get_total_tickets(),
        "loan_customers": get_loan_customers(),
        "credit_card_customers": get_credit_card_customers(),
        "system_status": "healthy"
    }


# admin customers

@app.get("/admin/customers")
def admin_customers():

    from app.services.database import cursor

    cursor.execute(
        """
        SELECT *
        FROM customers
        ORDER BY id DESC
        """
    )

    return {
        "customers": cursor.fetchall()
    }


# admin tickets

@app.get("/admin/tickets")
def admin_tickets():

    from app.services.database import cursor

    cursor.execute(
        """
        SELECT *
        FROM tickets
        ORDER BY id DESC
        """
    )

    return {
        "tickets": cursor.fetchall()
    }


# ticket status

@app.put("/admin/ticket-status")
def update_ticket_status(
    ticket_id: str,
    status: str
):

    from app.services.database import cursor, conn

    cursor.execute(
        """
        UPDATE tickets
        SET status = ?
        WHERE ticket_id = ?
        """,
        (
            status,
            ticket_id
        )
    )

    conn.commit()

    return {
        "ticket_id": ticket_id,
        "status": status
    }

# customer search

@app.get("/admin/search-customer")
def admin_search_customer(name: str):

    results = search_customer(name)

    return {
        "customers": results
    }


# customer details

@app.get("/admin/customer")
def admin_customer(name: str):

    results = search_customer(name)

    if not results:

        return {
            "message": "Customer not found"
        }

    return {
        "customer": results
    }