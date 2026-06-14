from app.services.database import add_faq


def load_default_faqs():


    faqs = [


# Greetings

("hi", "Hello! Welcome to NexaDesk. How may I assist you today?"),
("hello", "Hello! How can I assist you today?"),
("hey", "Hello! How may I help you today?"),
("good morning", "Good morning! How may I assist you today?"),
("good evening", "Good evening! How may I assist you today?"),
("thank you", "You're welcome. Please let me know if you need any further assistance."),
("thanks", "You're welcome. Please let me know if you need any further assistance."),
("bye", "Thank you for contacting NexaDesk. Have a great day."),
("how are you", "I'm ready to assist you with your banking and support needs."),
("tell me about you", "I am NexaDesk AI, a virtual banking assistant designed to help customers with banking services and support requests."),
("who created you", "I am part of the NexaDesk platform and designed By (NS NIAM) to assist customers with banking services."),
("what is your purpose", "My purpose is to help customers with banking information, support requests and service guidance."),
("no", "No problem. Please let me know if there is anything else I can assist you with."),
("okay", "Alright. Please let me know if you need any assistance."),
("ok", "Alright. Please let me know if you need any assistance."),
("what", "Could you please provide more details so I can assist you?"),
("help", "I can assist with accounts, cards, digital banking and customer support."),
("ai", "I am NexaDesk AI, your virtual banking support assistant."),
("who created you", "I am NexaDesk AI, developed By (NS-NIAM) to assist customers with banking and support requests."),
# Identity

("who are you", "I am NexaDesk AI, your virtual banking support assistant."),
("what can you do", "I can help with accounts, cards, digital banking, financing services and general customer support."),
("are you human", "No, I am an AI-powered virtual banking assistant."),

# Accounts

("account opening", "To open an account, please provide a valid ID, phone number and proof of address."),
("open account", "To open an account, please provide a valid ID, phone number and proof of address."),
("account requirements", "A valid ID, phone number and proof of address are required to open an account."),
("savings account", "Savings accounts help customers securely manage deposits and access banking services."),
("current account", "Current accounts are designed for frequent transactions and day-to-day banking activities."),
("minimum balance", "Minimum balance requirements vary depending on the account type."),
("account locked", "Your account may require identity verification before access can be restored."),
("close account", "Account closure requires identity verification and account review."),
("i need a card","Please specify whether you need a debit card or credit card."),

("need card","Please specify whether you need a debit card or credit card."),
("reset pin","PIN reset requires identity verification."),

("i forgot my pin","PIN reset requires identity verification."),
("hmm", "Could you please provide more details?"),
("ok", "Alright. Please let me know if you need any assistance."),
("okay", "Alright. Please let me know if you need any assistance."),
("ai", "I am NexaDesk AI, your virtual banking assistant."),
("change pin","PIN reset requires identity verification."),
# Cards

("credit card", "Credit cards are available for eligible customers and can be used for purchases and payments."),
("credit card application", "Credit card applications are subject to eligibility and verification requirements."),
("credit card limit", "Credit limits are assigned based on account profile and eligibility criteria."),
("debit card", "A debit card is typically issued after successful account opening."),
("replace card", "Please contact support to request a replacement card."),
("lost card", "For security reasons, please report your lost card immediately so it can be blocked."),
("stolen card", "Please contact support immediately to block your card and protect your account."),
("block card", "Cards can be blocked through customer support for security purposes."),
("unblock card", "Card reactivation may require identity verification."),
("debit", "A debit card is typically issued after successful account opening."),
("credit", "Credit cards are available for eligible customers."),
# Security

("forgot pin", "PIN reset requires identity verification for security purposes."),
("reset pin", "PIN reset requires identity verification for security purposes."),
("forgot password", "Password reset requires identity verification."),
("reset password", "Password reset requires identity verification."),
("change phone number", "Phone number updates require account verification."),
("change address", "Address updates require valid proof of address."),
("report fraud", "Please contact support immediately if you suspect fraudulent activity."),
("fraud transaction", "Please report any suspicious transaction immediately for investigation."),
("security", "Never share passwords, PINs or verification codes with anyone."),

# Islamic Banking

("islamic banking", "Islamic banking services are available based on Sharia-compliant principles."),
("mudarabah", "Mudarabah is a profit-sharing arrangement between the customer and the institution."),
("murabaha", "Murabaha is a Sharia-compliant financing arrangement based on cost-plus pricing."),
("ijara", "Ijara is a leasing-based financing solution available for eligible customers."),
("profit sharing", "Profit-sharing returns depend on the selected product and applicable terms."),
("i want to create","Please specify what you would like to create or apply for. We can assist with new accounts, cards, financing services, and digital banking."
)
]


    for question, answer in faqs:
        add_faq(question, answer)
