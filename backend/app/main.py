
from fastapi import FastAPI
from app.models.chat import (
    ChatRequest,
    ChatResponse
)
from fastapi import Depends

from app.services.security import (
    verify_api_key
)
from app.services.config import GEMINI_API_KEY
from app.services.session_manager import create_session
from app.services.auth import is_authenticated

from app.services.gemini_service import (
    ask_gemini,
    ask_gemini_with_context,
    ask_gemini_with_history
)

from app.services.rag_service import (
    get_rag_context
)

from app.services.intent_classifier import (
    classify_intent,
    extract_customer_data
)

from app.services.knowledge_base import (
    load_default_faqs
)
from app.services.memory import (
    chat_history
)

from app.services.chat_context import (
    build_chat_context
)

from app.services.customer_profile import (
    customer_profile
)

from app.services.ticket_manager import (
    create_ticket
)


from app.services.database import (
    get_feedback_stats,
    save_message,
    get_chat_history,
    search_faq,

    save_ticket,
    save_intent,
    save_customer,

    get_ticket_status,
    update_ticket_in_progress,

    get_open_tickets,
    get_closed_tickets,

    get_customer_by_name,
    search_customer,

    get_loan_customers,
    get_credit_card_customers,

    get_total_messages,
    get_total_customers,
    get_total_tickets,

    get_intent_analytics,

    get_dashboard_stats,

    save_feedback,
    get_feedbacks,
    get_average_rating,

    get_customer_activity,
    save_audit_log,
    get_audit_logs
)

from fastapi.middleware.cors import CORSMiddleware

users = []

app = FastAPI(
    title="NexaDesk AI",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
    save_intent(intent)

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

        context = get_rag_context(
             message
          )

        response = ask_gemini_with_context(
        message,
        context
        )

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

    # save customer

    if customer_profile.get("name"):

        save_customer(
            customer_profile.get(
                "name"
            ),
            customer_profile.get(
               "loan_interest",
                False
            ),
            customer_profile.get(
               "credit_card_interest",
                False
        )
    )

    # save user message

    save_message(
        session_id,
        "user",
        message
    )

    # faq retrieval

    faq_answer = search_faq(
        message.lower().strip()
     )

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

    save_intent(intent)

    # account opening

    if intent == "account_opening":

        response = (
            "To open a bank account, please provide "
            "your ID, phone number and proof of address."
        )

    # loan inquiry (RAG)

    elif intent == "loan_inquiry":

        context = get_rag_context(
            message
        )

        response = ask_gemini_with_context(
            message,
            context
        )

    # credit card (RAG)

    elif intent == "credit_card_support":

        context = get_rag_context(
            message
        )

        response = ask_gemini_with_context(
            message,
            context
        )

    # debit card

    elif intent == "debit_card_support":

        response = (
            "Please provide your account number "
            "to request a new debit card."
        )

    # card activation

    elif intent == "card_activation":

        response = (
            "Please provide the last 4 digits "
            "of your card to begin activation."
        )

    # pin reset

    elif intent == "pin_reset":

        response = (
            "For security reasons, PIN reset "
            "requires identity verification."
        )

    # card replacement

    elif intent == "card_replacement":

        response = (
            "Your replacement card request "
            "has been created successfully."
        )

    # card status

    elif intent == "card_status":

        response = (
            "Your card is currently active "
            "and available for transactions."
        )

    # card security

    elif intent == "card_security":

        response = (
            "Your card security request has been "
            "prioritized. Please block your card "
            "immediately and contact support."
        )

    # balance inquiry

    elif intent == "balance_inquiry":

        if not is_authenticated():

          response = (
            "Authentication required. "
            "Please provide your Customer ID."
        )

        else:

          response = (
            "Authentication successful. "
            "Balance information is available."
        )
    # money transfer

    elif intent == "money_transfer":

        response = (
            "Please provide transfer details "
            "including recipient account information."
        )

    # branch info

    elif intent == "branch_information":

        response = (
            "Please provide your city "
            "to find the nearest branch."
        )

    # online banking

    elif intent == "online_banking_support":

        response = (
            "Please describe your online banking issue."
        )

    # human handoff

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

    # complaint

    elif intent == "complaint":

        ticket_id = create_ticket()

        save_ticket(
            ticket_id,
            session_id,
            "complaint"
        )

        response = (
            f"Complaint registered successfully. "
            f"Ticket ID: {ticket_id}"
        )

    # service request

    elif intent == "service_request":

        ticket_id = create_ticket()

        save_ticket(
            ticket_id,
            session_id,
            "service_request"
        )

        response = (
            f"Service request created successfully. "
            f"Ticket ID: {ticket_id}"
        )

    # update phone

    elif intent == "update_phone":

        if not is_authenticated():

          response = (
            "Authentication required. "
            "Please provide your Customer ID."
        )

        else:

          ticket_id = create_ticket()

        save_ticket(
            ticket_id,
            session_id,
            "update_phone"
        )

        response = (
            f"Phone number update request "
            f"created successfully. "
            f"Ticket ID: {ticket_id}"
        )
    # update email

    elif intent == "update_email":

        ticket_id = create_ticket()

        save_ticket(
            ticket_id,
            session_id,
            "update_email"
        )

        response = (
            f"Email update request created successfully. "
            f"Ticket ID: {ticket_id}"
        )

    # update address

    elif intent == "update_address":

        ticket_id = create_ticket()

        save_ticket(
            ticket_id,
            session_id,
            "update_address"
        )

        response = (
            f"Address update request created successfully. "
            f"Ticket ID: {ticket_id}"
        )

    # kyc update

    elif intent == "kyc_update":

        ticket_id = create_ticket()

        save_ticket(
            ticket_id,
            session_id,
            "kyc_update"
        )

        response = (
            f"KYC update request created successfully. "
            f"Ticket ID: {ticket_id}"
        )

    # fallback ai

    else:

        context = get_rag_context(
        message
        )

        if context and len(
        context.strip()
        ) > 50:

             response = ask_gemini_with_context(
             message,
             context
            )

        else:

            response = ask_gemini(
            message
        )
    # save assistant response

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
    "top_intents": get_intent_analytics(),
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


# top intents

@app.get("/admin/top-intents")
def top_intents():

    return {
        "intents": get_intent_analytics()
    }


# rag testing

@app.get("/rag-test")
def rag_test(
    question: str
):

    context = get_rag_context(
        question
    )

    return {
        "question": question,
        "retrieved_context": context
    }

@app.get("/customer")
def customer_search(
    name: str
):

    return {
        "customer": get_customer_by_name(name)
    }

@app.get("/auth-status")
def auth_status():

    return {
        "authenticated": is_authenticated()
    }




@app.get("/ticket-status")
def ticket_status(
    ticket_id: str
):

    return {
        "ticket": get_ticket_status(
            ticket_id
        )
    }



@app.get("/session-history")
def session_history(
    session_id: str,
    _: str = Depends(
        verify_api_key
    )
):

    return {
        "history": get_chat_history(
            session_id
        )
    }

@app.get("/open-tickets")
def open_tickets(
    _: str = Depends(
        verify_api_key
    )
):

    return {
        "tickets": get_open_tickets()
    }

@app.get("/closed-tickets")
def closed_tickets(
    _: str = Depends(
        verify_api_key
    )
):

    return {
        "tickets": get_closed_tickets()
    }



@app.put("/ticket-progress")
def ticket_progress(
    ticket_id: str
):

    update_ticket_in_progress(
        ticket_id
    )

    save_audit_log(
        "ticket_in_progress",
        ticket_id
    )

    return {
        "status": "in_progress"
    }

@app.post("/feedback")
def feedback(
    ticket_id: str,
    rating: int,
    comment: str
):

    save_feedback(
        ticket_id,
        rating,
        comment
    )

    return {
        "status": "feedback_saved"
    }

@app.get("/feedbacks")
def feedbacks():

    return {
        "feedbacks": get_feedbacks()
    }


@app.get("/average-rating")
def average_rating():

    return {
        "average_rating": get_average_rating()
    }

@app.get("/customer-activity")
def customer_activity(
    _: str = Depends(
        verify_api_key
    )
):

    return {
        "customers": get_customer_activity()
    }




@app.get("/audit-logs")
def audit_logs(
    _: str = Depends(
        verify_api_key
    )
):

    return {
        "logs": get_audit_logs()
    }


@app.put("/ticket-close")
def ticket_close(ticket_id: str):

    print("CLOSING =", ticket_id)

    update_ticket_status(
        ticket_id,
        "CLOSED"
    )

    save_audit_log(
        "ticket_closed",
        ticket_id
    )

    print("AUDIT SAVED")

    return {
        "status": "closed"
    }

@app.get("/feedback-stats")
def feedback_stats():

    return get_feedback_stats()



@app.get("/health")
def health():

    return {
        "status": "healthy",
        "service": "NexaDesk AI"
    }



@app.get("/dashboard")
def dashboard(
    _: str = Depends(verify_api_key)
):
    return get_dashboard_stats()

@app.post("/register-user")
def register_user(
    name: str,
    email: str,
    role: str
):

    for user in users:

        if user["email"] == email:

            return {
                "message":
                "User already exists"
            }

    users.append({
        "name": name,
        "email": email,
        "role": role
    })

    return {
        "message":
        "User registered"
    }


@app.get("/users")
def get_users():

    return {
        "users": users
    }
