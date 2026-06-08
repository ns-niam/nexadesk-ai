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

cursor.execute("""
CREATE TABLE IF NOT EXISTS faq (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT UNIQUE,
    answer TEXT
)
""")

conn.commit()

def add_faq(
    question: str,
    answer: str
):

    cursor.execute(
        """
        INSERT OR IGNORE INTO faq
        (question, answer)
        VALUES (?, ?)
        """,
        (question, answer)
    )

    conn.commit()


def search_faq(
    keyword: str
):

    cursor.execute(
        """
        SELECT answer
        FROM faq
        WHERE question LIKE ?
        LIMIT 1
        """,
        (f"%{keyword}%",)
    )

    result = cursor.fetchone()

    if result:
        return result[0]

    return None