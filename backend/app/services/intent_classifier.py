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


from app.services.customer_profile import customer_profile


def extract_customer_data(message: str):

    words = message.split()

    if "my name is" in message.lower():

        customer_profile["name"] = words[-1]

    if "loan" in message.lower():

        customer_profile["loan_interest"] = True

    if "credit card" in message.lower():

        customer_profile["credit_card_interest"] = True