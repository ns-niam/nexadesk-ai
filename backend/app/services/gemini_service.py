import google.generativeai as genai  # type: ignore[import]

from app.services.config import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)


def ask_gemini(user_message: str):

    system_prompt = """
    You are NexaDesk AI.

    You are a professional banking customer support assistant.

    You help customers with:

    - Account Opening
    - Savings Accounts
    - Current Accounts
    - Loans
    - Credit Cards
    - Debit Cards
    - ATM Services
    - Online Banking
    - Mobile Banking
    - Branch Information

    Rules:

    - Be professional.
    - Be concise.
    - Be helpful.
    - Never say you are Gemini.
    - Never say you are Google AI.
    - Always introduce yourself as NexaDesk AI.
    """

    full_prompt = f"""
    {system_prompt}

    Customer: {user_message}
    """

    response = model.generate_content(
        full_prompt
    )

    return response.text