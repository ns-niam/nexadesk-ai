def classify_intent(message: str):

    message = message.lower()

    if "account" in message:
        return "account_opening"

    elif "loan" in message:
        return "loan_inquiry"

    elif "credit card" in message:
        return "credit_card_support"

    elif "debit card" in message:
        return "debit_card_support"

    elif "human" in message:
        return "human_handoff"

    else:
        return "general_query"