import uuid

sessions = {}


def create_session():

    session_id = str(uuid.uuid4())

    sessions[session_id] = []

    return session_id


def get_session_history(session_id: str):

    return sessions.get(session_id, [])


def add_message(session_id: str, role: str, message: str):

    if session_id not in sessions:
        sessions[session_id] = []

    sessions[session_id].append({
        role: message
    })