import { useState, useEffect, useRef } from "react";

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div
      style={{
        height: "100vh",
        background: "#0f172a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          height: "95vh",
          background: "#111827",
          borderRadius: "20px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px",
            borderBottom: "1px solid #374151",
            color: "white",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          NexaDesk AI
        </div>

        {/* Chat Area */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px",
          }}
        >
          {messages.length === 0 && (
            <div
              style={{
                color: "#9ca3af",
                textAlign: "center",
                marginTop: "120px",
                fontSize: "18px",
              }}
            >
              Welcome to NexaDesk AI
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent:
                  msg.sender === "user"
                    ? "flex-end"
                    : "flex-start",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  maxWidth: "75%",
                  padding: "14px 18px",
                  borderRadius: "18px",
                  background:
                    msg.sender === "user"
                      ? "#2563eb"
                      : "#1f2937",
                  color: "white",
                  lineHeight: "1.6",
                  wordBreak: "break-word",
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div
              style={{
                color: "#9ca3af",
                padding: "10px",
              }}
            >
              NexaDesk AI is typing...
            </div>
          )}

          <div ref={messagesEndRef}></div>
        </div>

        {/* Input Area */}
        <div
          style={{
            padding: "20px",
            borderTop: "1px solid #374151",
            display: "flex",
            gap: "10px",
          }}
        >
          <input
            type="text"
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            placeholder="Ask anything..."
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              outline: "none",
              background: "#1f2937",
              color: "white",
              fontSize: "16px",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            style={{
              padding: "14px 24px",
              border: "none",
              borderRadius: "12px",
              background: "#2563eb",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
