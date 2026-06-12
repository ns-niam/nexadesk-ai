import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const currentMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: currentMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://crispy-rotary-phone-q749q77g55jv29vrg-8000.app.github.dev/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            session_id: "frontend-user",
            message: currentMessage,
          }),
        }
      );

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: data.response,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Connection error. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="app">
      <div className="sidebar">
        <h2>NexaDesk</h2>

        <button
          className="new-chat-btn"
          onClick={clearChat}
        >
          + New Chat
        </button>

        <div className="sidebar-item">
          Banking Assistant
        </div>
      </div>

      <div className="chat-container">
        <div className="header">
          🏦 NexaDesk AI Assistant
        </div>

        <div className="messages">
          {messages.length === 0 && (
            <div className="welcome">
              Welcome to NexaDesk AI 🚀
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.sender === "user"
                  ? "message-row user"
                  : "message-row ai"
              }
            >
              <div
                className={
                  msg.sender === "user"
                    ? "message user-bubble"
                    : "message ai-bubble"
                }
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="typing">
              NexaDesk AI is typing...
            </div>
          )}

          <div ref={messagesEndRef}></div>
        </div>

        <div className="input-area">
          <input
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="Ask about cards, accounts, transfers..."
          />

          <button onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
