import google.generativeai as genai

from app.services.memory import chat_history
from app.services.config import GEMINI_API_KEY
from app.services.groq_service import ask_groq

genai.configure(
    api_key=GEMINI_API_KEY
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)


def build_history():

    if not chat_history:
        return "No previous conversation."

    history_text = ""

    for item in chat_history[-20:]:

        if "user" in item:
            history_text += (
                f"Customer: {item['user']}\n"
            )

        elif "assistant" in item:
            history_text += (
                f"Assistant: {item['assistant']}\n"
            )

    return history_text


def clean_response(text: str):

    text = text.replace("*", "")
    text = text.replace("#", "")
    text = text.replace("```", "")

    return text.strip()


def ask_gemini(user_message: str):

    try:

        history_text = build_history()

        system_prompt = """
You are NexaDesk AI.

You are a professional banking and customer support assistant.

Rules:

1. Be professional and concise.
2. Answer only the user's question.
3. Use a maximum of 2 sentences.
4. Do not provide unnecessary explanations.
5. Use conversation history when relevant.
6. Ask for clarification if needed.
7. Never mention Gemini or Google AI.
8. Do not use markdown.
9. Do not invent information.
10. If information is unavailable, politely say so.
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

        return clean_response(
            response.text
        )

    except Exception:

        return ask_groq(
             user_message
        )


def ask_gemini_with_context(
    user_message: str,
    context: str
):

    try:

        prompt = f"""
Knowledge:

{context}

Customer Question:

{user_message}

Answer using only the provided knowledge.
Keep the response short and professional.
"""

        response = model.generate_content(
            prompt
        )

        return clean_response(
            response.text
        )

    except Exception:

        return (
        "Please provide more details so I can assist you."
    )


def ask_gemini_with_history(
    message: str,
    history: str
):

    prompt = f"""
Conversation History:

{history}

Current User Message:

{message}
"""

    return ask_gemini(
        prompt
    )
