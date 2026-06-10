from app.services.database import (
    get_chat_history
)


def build_chat_context(
    session_id: str
):

    history = get_chat_history(
        session_id
    )

    context = ""

    for role, message in history:

        context += (
            f"{role}: {message}\n"
        )

    return context