from app.services.database import add_faq


def load_default_faqs():

    faqs = [

        (
            "account opening",
            "To open an account, provide a valid ID, phone number and proof of address."
        ),

        (
            "loan",
            "We offer personal, home, education and business loans."
        ),

        (
            "credit card",
            "Credit cards are available based on income and eligibility."
        ),

        (
            "debit card",
            "A debit card is issued after account opening."
        ),

        (
            "online banking",
            "You can register for online banking through our website."
        )
    ]

    for question, answer in faqs:
        add_faq(question, answer)