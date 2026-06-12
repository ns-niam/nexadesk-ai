import { useState, useEffect, useRef } from "react";
import { sendChatMessage } from "../services/api";

function ChatPage() {

  // States

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  // Session

  const [sessionId] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "nexadesk_session"
        );

      if (saved) {
        return saved;
      }

      const newId =
        crypto.randomUUID();

      localStorage.setItem(
        "nexadesk_session",
        newId
      );

      return newId;
    });

  // Refs

  const messagesEndRef =
    useRef(null);

  // Chat Functions

  const clearChat = () => {

    localStorage.removeItem(
      "nexadesk_messages"
    );

    setMessages([]);
  };

  const handleSend =
    async () => {

      if (
        !message.trim()
      ) {
        return;
      }

      const currentMessage =
        message;

      setMessages(
        (prev) => [
          ...prev,
          {
            sender: "user",
            text: currentMessage,
          },
        ]
      );

      setMessage("");

      setLoading(true);

      try {

        const data =
          await sendChatMessage(
            sessionId,
            currentMessage
          );

        setMessages(
          (prev) => [
            ...prev,
            {
              sender: "ai",
              text:
                data.response,
            },
          ]
        );

      } catch {

        setMessages(
          (prev) => [
            ...prev,
            {
              sender: "ai",
              text:
                "Connection error.",
            },
          ]
        );

      } finally {

        setLoading(false);
      }
    };

  // Local Storage

  useEffect(() => {

    const savedMessages =
      localStorage.getItem(
        "nexadesk_messages"
      );

    if (
      savedMessages
    ) {

      setMessages(
        JSON.parse(
          savedMessages
        )
      );
    }

  }, []);

  useEffect(() => {

    localStorage.setItem(
      "nexadesk_messages",
      JSON.stringify(
        messages
      )
    );

  }, [messages]);

  // Auto Scroll

  useEffect(() => {

    messagesEndRef
      .current
      ?.scrollIntoView({
        behavior:
          "smooth",
      });

  }, [
    messages,
    loading,
  ]);

  // UI

  return (
    <div
      className="chat-container"
    >

      <div
        className="header"
      >
        🏦 NexaDesk AI
      </div>

      <div
        className="messages"
      >

        {messages.length ===
          0 && (

          <div
            className="welcome"
          >
            <h2>
              Welcome to
              NexaDesk AI
            </h2>

            <p>
              Ask about
              accounts,
              cards,
              tickets,
              transfers and
              customer
              support.
            </p>
          </div>
        )}

        {messages.map(
          (
            msg,
            index
          ) => (

            <div
              key={index}
              className={
                msg.sender ===
                "user"
                  ? "message-row user"
                  : "message-row ai"
              }
            >
              <div
                className={
                  msg.sender ===
                  "user"
                    ? "message user-bubble"
                    : "message ai-bubble"
                }
              >
                {msg.text}
              </div>
            </div>
          )
        )}

        {loading && (
          <div
            className="typing"
          >
            🤖 NexaDesk AI
            is thinking...
          </div>
        )}

        <div
          ref={
            messagesEndRef
          }
        />

      </div>

      <div
        className="input-area"
      >

        <button
          onClick={
            clearChat
          }
        >
          New Chat
        </button>

        <input
          value={message}
          onChange={(
            e
          ) =>
            setMessage(
              e.target
                .value
            )
          }
          placeholder="Ask anything..."
          onKeyDown={(
            e
          ) => {

            if (
              e.key ===
              "Enter"
            ) {

              handleSend();
            }
          }}
        />

        <button
          onClick={
            handleSend
          }
        >
          Send
        </button>

      </div>

    </div>
  );
}

export default ChatPage;
