from groq import Groq

from app.services.config import GROQ_API_KEY

client = Groq(
    api_key=GROQ_API_KEY
)


def ask_groq(message: str):

    try:

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are NexaDesk AI. "
                        "Be professional, concise and helpful."
                    )
                },
                {
                    "role": "user",
                    "content": message
                }
            ]
        )

        return (
            response
            .choices[0]
            .message
            .content
        )

    except Exception:

        return (
        "NexaDesk AI is temporarily unavailable. "
        "Please try again in a few moments."
    )
