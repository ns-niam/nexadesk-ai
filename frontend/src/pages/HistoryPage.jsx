import { useEffect, useState }
from "react";

function HistoryPage() {

  const [history,
    setHistory] =
    useState([]);

  useEffect(() => {

    const loadHistory =
      async () => {

      try {

        const response =
          await fetch(
            "https://crispy-rotary-phone-q749q77g55jv29vrg-8000.app.github.dev/session-history?session_id=frontend-user",
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
      className="page-container"
    >

      <h1>
        Chat History
      </h1>

      <br />

      {history.map(
        (
          item,
          index
        ) => (

          <div
            key={index}
            className="settings-card"
            style={{
              marginBottom:
                "12px"
            }}
          >

            <strong>

              {item[0] ===
              "user"
                ? "👤 User"
                : "🤖 AI"}

            </strong>

            <br />
            <br />

            {item[1]}

          </div>

        )
      )}

    </div>

  );
}

export default HistoryPage;
