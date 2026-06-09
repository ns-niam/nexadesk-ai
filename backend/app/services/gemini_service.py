import google.generativeai as genai  # type: ignore[import]

from app.services.memory import chat_history
from app.services.config import GEMINI_API_KEY


genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)


def build_history():

    if not chat_history:
        return "No previous conversation."

    history_text = ""

    for item in chat_history[-20:]:

        if "user" in item:
            history_text += f"Customer: {item['user']}\n"

        elif "assistant" in item:
            history_text += f"Assistant: {item['assistant']}\n"

    return history_text


def ask_gemini(user_message: str):

    try:

        history_text = build_history()

        system_prompt = """
You are NexaDesk AI.

You are an enterprise-grade banking customer support assistant.

Responsibilities:

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
- Customer Support

Behavior Rules:

1. Always identify yourself as NexaDesk AI.
2. Never mention Gemini.
3. Never mention Google AI.
4. Be professional.
5. Be concise.
6. Be customer friendly.
7. Use conversation history when available.
8. Remember customer information from previous messages.
9. Ask follow-up questions when information is missing.
10. Format responses clearly.

Response Style:

- Greeting
- Direct Answer
- Next Action
"""

        full_prompt = f"""
{system_prompt}

Conversation History:

{history_text}

Current Customer Message:

{user_message}
"""

        response = model.generate_content(
            full_prompt
        )

        return response.text

    except Exception as e:

        return (
            "NexaDesk AI is currently unavailable. "
            f"Technical details: {str(e)}"
        )
    

def ask_gemini_with_context(
    user_message: str,
    context: str
):

    prompt = f"""
    You are NexaDesk AI.

    Banking Knowledge:

    {context}

    Customer Question:

    {user_message}

    Answer using the banking knowledge above.
    """

    response = model.generate_content(
        prompt
    )

    return response.text