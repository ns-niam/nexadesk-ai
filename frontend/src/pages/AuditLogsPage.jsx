import {
  useEffect,
  useState
} from "react";

function AuditLogsPage() {

  const [
    logs,
    setLogs
  ] = useState([]);

  useEffect(() => {

    const loadLogs =
      async () => {

        try {

          const response =
            await fetch(
              "https://nexadesk-ai-production.up.railway.app/audit-logs",
              {
                headers: {
                  "X-API-KEY":
                    "nexadesk-secret-key"
                }
              }
            );

          const data =
            await response.json();

          setLogs(
            data.logs || []
          );

        } catch (
        error
        ) {

          console.log(
            error
          );
        }
      };

    loadLogs();

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
        Audit Logs
      </h1>

      <p
        style={{
          color: "#9ca3af",
          marginBottom: "30px",
        }}
      >
        System activity tracking and administrative actions.
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
          Total Audit Records
        </h3>

        <h1>
          {logs.length}
        </h1>
      </div>

      {logs.length === 0 ? (

        <p>
          No audit logs found.
        </p>

      ) : (

        logs.map(
          (
            log,
            index
          ) => (

            <div
              key={index}
              style={{
                background:
                  "#1f2937",

                padding:
                  "18px",

                marginBottom:
                  "15px",

                borderRadius:
                  "14px",

                border:
                  "1px solid #374151",
              }}
            >

              <h3>
                 Action:
                {" "}
                {log[1]}
              </h3>

              <p>
                🎫 Ticket:
                {" "}
                {log[2]}
              </p>

              <p
                style={{
                  color: "#9ca3af",
                  marginTop: "10px",
                }}
              >
                Audit Record #
                {index + 1}
              </p>

            </div>

          )
        )

      )}

    </div>

  );
}

export default AuditLogsPage;
