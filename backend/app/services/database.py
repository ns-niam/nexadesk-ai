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

cursor.execute("""
CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    loan_interest INTEGER DEFAULT 0,
    credit_card_interest INTEGER DEFAULT 0
)
""")

conn.commit()


cursor.execute("""
CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_id TEXT,
    session_id TEXT,
    issue_type TEXT,
    status TEXT
)
""")

conn.commit()

def save_customer(
    name: str,
    loan_interest: bool,
    credit_card_interest: bool
):

    cursor.execute(
        """
        SELECT id
        FROM customers
        WHERE name = ?
        """,
        (name,)
    )

    existing = cursor.fetchone()

    if existing:
        return

    cursor.execute(
        """
        INSERT INTO customers
        (
            name,
            loan_interest,
            credit_card_interest
        )
        VALUES (?, ?, ?)
        """,
        (
            name,
            int(loan_interest),
            int(credit_card_interest)
        )
    )

    conn.commit()

def save_ticket(
    ticket_id: str,
    session_id: str,
    issue_type: str
):

    cursor.execute(
        """
        INSERT INTO tickets
        (
            ticket_id,
            session_id,
            issue_type,
            status
        )
        VALUES (?, ?, ?, ?)
        """,
        (
            ticket_id,
            session_id,
            issue_type,
            "OPEN"
        )
    )

    conn.commit()


def get_total_messages():

    cursor.execute(
        """
        SELECT COUNT(*)
        FROM chat_history
        """
    )

    return cursor.fetchone()[0]


def get_total_customers():

    cursor.execute(
        """
        SELECT COUNT(*)
        FROM customers
        """
    )

    return cursor.fetchone()[0]


def get_total_tickets():

    cursor.execute(
        """
        SELECT COUNT(*)
        FROM tickets
        """
    )

    return cursor.fetchone()[0]