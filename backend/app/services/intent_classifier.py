def classify_intent(message: str):

    message = message.lower()

    if (
        "lost" in message and "card" in message
    ) or (
        "stolen" in message and "card" in message
    ):
        return "card_security"

    account_keywords = [
        "account",
        "open account",
        "new account",
        "create account",
        "savings",
        "saving account",
        "current account",
        "checking account"
    ]

    loan_keywords = [
        "loan",
        "personal loan",
        "home loan",
        "mortgage",
        "education loan",
        "student loan",
        "business loan",
        "car loan",
        "borrow money"
    ]

    credit_card_keywords = [
        "credit card",
        "visa",
        "mastercard",
        "credit limit",
        "card application",
        "apply card"
    ]

    debit_card_keywords = [
        "debit card",
        "atm card",
        "replace card",
        "new debit card",
        "lost card"
    ]

    transfer_keywords = [
        "transfer",
        "send money",
        "wire transfer",
        "bank transfer",
        "international transfer",
        "payment"
    ]

    balance_keywords = [
        "balance",
        "account balance",
        "check balance",
        "available balance"
    ]

    human_keywords = [
        "human",
        "agent",
        "representative",
        "customer service",
        "support agent",
        "real person",
        "talk to someone"
    ]

    card_block_keywords = [
    "block card",
    "freeze card",
    "stolen card",
    "lost card",
    "lost my card",
    "my card is lost",
    "card stolen",
    "card lost",
    "lost debit card",
    "lost credit card"
    ]

    branch_keywords = [
        "branch",
        "location",
        "office",
        "nearest branch",
        "bank branch"
    ]

    online_banking_keywords = [
        "online banking",
        "internet banking",
        "mobile banking",
        "bank app",
        "login issue",
        "forgot password"
    ]

    if any(keyword in message for keyword in human_keywords):
        return "human_handoff"
    
    elif any(keyword in message for keyword in card_activation_keywords):
        return "card_activation"

    elif any(keyword in message for keyword in pin_reset_keywords):
        return "pin_reset"

    elif any(keyword in message for keyword in card_replacement_keywords):
        return "card_replacement"

    elif any(keyword in message for keyword in card_status_keywords):
        return "card_status"

    elif (
    "lost" in message and "card" in message
     ) or (
      "stolen" in message and "card" in message
     ):
        return "card_security"

    elif any(keyword in message for keyword in card_block_keywords):
        return "card_security"

    elif any(keyword in message for keyword in loan_keywords):
        return "loan_inquiry"

    elif any(keyword in message for keyword in credit_card_keywords):
        return "credit_card_support"

    elif any(keyword in message for keyword in debit_card_keywords):
        return "debit_card_support"

    elif any(keyword in message for keyword in account_keywords):
        return "account_opening"

    elif any(keyword in message for keyword in transfer_keywords):
        return "money_transfer"

    elif any(keyword in message for keyword in balance_keywords):
        return "balance_inquiry"

    elif any(keyword in message for keyword in branch_keywords):
        return "branch_information"

    elif any(keyword in message for keyword in online_banking_keywords):
        return "online_banking_support"

    else:
        return "general_query"
    

from app.services.customer_profile import customer_profile


def extract_customer_data(message: str):

    message_lower = message.lower()

    # name extraction

    if "my name is" in message_lower:

        try:

            start = message_lower.find("my name is")

            name_text = message[start + len("my name is"):].strip()

            name = name_text.split()[0]

            customer_profile["name"] = name.capitalize()

        except Exception:
            pass

    # loan interest

    if "loan" in message_lower:

        customer_profile["loan_interest"] = True

    # credit card interest

    if "credit card" in message_lower:

        customer_profile["credit_card_interest"] = True


card_activation_keywords = [
    "activate card",
    "card activation",
    "activate my card",
    "new card activation"
]

pin_reset_keywords = [
    "pin reset",
    "forgot pin",
    "change pin",
    "reset pin",
    "new pin"
]

card_replacement_keywords = [
    "replace card",
    "replacement card",
    "new card",
    "damaged card",
    "expired card"
]

card_status_keywords = [
    "card status",
    "is my card active",
    "card active",
    "card information"
]        