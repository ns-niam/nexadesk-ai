from app.services.memory import (
    chat_history,
    conversation_summary
)


def get_recent_history():

    return chat_history[-10:]


def should_summarize():

    return len(chat_history) > 20