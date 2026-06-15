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
            "https://nexadesk-ai-production.up.railway.app",
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
      className="page-container"
    >
      <h1>
        Audit Logs
      </h1>

      <br />

      {logs.length === 0 ? (

        <p>
          No audit logs found
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
                {log[1]}
              </h3>

              <p>
                Ticket:
                {log[2]}
              </p>
            </div>
          )
        )

      )}

    </div>
  );
}

export default AuditLogsPage;
