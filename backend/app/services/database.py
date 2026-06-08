import sqlite3

conn = sqlite3.connect(
    "nexadesk.db",
    check_same_thread=False
)

cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS chat_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT,
    role TEXT,
    message TEXT
)
""")

conn.commit()


def save_message(
    session_id: str,
    role: str,
    message: str
):

    cursor.execute(
        """
        INSERT INTO chat_history
        (
            session_id,
            role,
            message
        )
        VALUES (?, ?, ?)
        """,
        (
            session_id,
            role,
            message
        )
    )

    conn.commit()


def get_chat_history(
    session_id: str
):

    cursor.execute(
        """
        SELECT role, message
        FROM chat_history
        WHERE session_id = ?
        ORDER BY id
        """,
        (session_id,)
    )

    return cursor.fetchall()