import {
  useEffect,
  useState
} from "react";

function ConversationsPage() {

  const [
    conversations,
    setConversations
  ] = useState([]);

  useEffect(() => {

    const loadConversations =
      async () => {

        try {

          const response =
            await fetch(
              "https://nexadesk-ai-production.up.railway.app/admin/conversations",
              {
                headers: {
                  "X-API-Key":
                    "nexadesk-secret-key"
                }
              }
            );

          const data =
            await response.json();

          setConversations(
            data.conversations || []
          );

        } catch (error) {

          console.log(error);

        }
      };

    loadConversations();

  }, []);

  return (

    <div
      style={{
        padding: "30px",
        color: "white",
        overflowY: "auto",
        height: "100vh",
      }}
    >

      <h1>
        Customer Conversations
      </h1>

      <p
        style={{
          color: "#9ca3af",
          marginBottom: "30px",
        }}
      >
        Monitor customer interactions
        and AI responses.
      </p>

      <div
        style={{
          background: "#1f2937",
          padding: "20px",
          borderRadius: "14px",
          marginBottom: "30px",
        }}
      >
        <h3>
          Total Messages
        </h3>

        <h1>
          {conversations.length}
        </h1>
      </div>

      {conversations.length === 0 ? (

        <p>
          No conversations found.
        </p>

      ) : (

        conversations.map(
          (
            conversation,
            index
          ) => (

            <div
              key={index}
              style={{
                background: "#1f2937",
                padding: "18px",
                marginBottom: "15px",
                borderRadius: "14px",
                border:
                  "1px solid #374151",
              }}
            >

              <h3>
                👤 User:
                {" "}
                {conversation[0]}
              </h3>

              <p
                style={{
                  marginTop: "10px",
                  color:
                    conversation[1] === "user"
                      ? "#60a5fa"
                      : "#22c55e",
                }}
              >
                {conversation[1] === "user"
                  ? "Customer Message"
                  : "AI Response"}
              </p>

              <div
                style={{
                  background: "#111827",
                  padding: "12px",
                  borderRadius: "10px",
                  marginTop: "10px",
                  lineHeight: "1.7",
                }}
              >
                {conversation[2]}
              </div>

            </div>

          )
        )

      )}

    </div>

  );
}

export default ConversationsPage;
