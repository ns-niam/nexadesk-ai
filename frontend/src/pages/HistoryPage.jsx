import {
  useEffect,
  useState
} from "react";

function HistoryPage() {

  const [
    history,
    setHistory
  ] = useState([]);

  useEffect(() => {

    const loadHistory =
      async () => {

        try {

          const sessionId =
            localStorage.getItem(
              "user_email"
            );

          const response =
            await fetch(
              `https://nexadesk-ai-production.up.railway.app/session-history?session_id=${sessionId}`,
              {
                headers: {
                  "X-API-KEY":
                    "nexadesk-secret-key"
                }
              }
            );
          const data =
            await response.json();

          setHistory(
            data.history || []
          );

        } catch (
        error
        ) {

          console.log(
            error
          );
        }
      };

    loadHistory();

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
        Chat History
      </h1>

      <p
        style={{
          color: "#9ca3af",
          marginBottom: "30px",
        }}
      >
        View previous customer conversations and AI responses.
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
          {history.length}
        </h1>
      </div>

      {history.length === 0 ? (

        <p>
          No chat history found.
        </p>

      ) : (

        history.map(
          (
            item,
            index
          ) => (

            <div
              key={index}
              style={{
                background:
                  item[0] === "user"
                    ? "#1f2937"
                    : "#111827",

                padding:
                  "18px",

                marginBottom:
                  "15px",

                borderRadius:
                  "14px",

                border:
                  item[0] === "user"
                    ? "1px solid #2563eb"
                    : "1px solid #374151",
              }}
            >

              <h3>
                {item[0] === "user"
                  ? "👤 User"
                  : "🤖 NexaDesk AI"}
              </h3>

              <p
                style={{
                  marginTop: "10px",
                  lineHeight: "1.7",
                }}
              >
                {item[1]}
              </p>

            </div>

          )
        )

      )}

    </div>

  );
}

export default HistoryPage;
