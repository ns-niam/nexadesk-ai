import {
  useEffect,
  useState
} from "react";

import {
  getHealth
} from "../services/api";

function SettingsPage() {

  const [
    health,
    setHealth
  ] = useState(null);

  useEffect(() => {

    const loadHealth =
      async () => {

        try {

          const data =
            await getHealth();

          setHealth(data);

        } catch {

          setHealth({
            status:
              "offline",
          });
        }
      };

    loadHealth();

  }, []);

  return (

    <div
      className="page-container"
      style={{
        color: "white",
        padding: "30px",
      }}
    >

      <h1
        style={{
          textAlign: "center",
          fontSize: "60px",
        }}
      >
        Settings
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#9ca3af",
          marginBottom: "30px",
        }}
      >
        Manage system preferences,
        security and platform health.
      </p>

      {/* Health */}

      <div
        className="settings-card"
      >
        <h2>
          System Health
        </h2>

        <br />

        {health ? (

          <>

            <h3
              style={{
                color:
                  health.status ===
                  "healthy"
                    ? "#22c55e"
                    : "#ef4444",
              }}
            >
              {health.status ===
              "healthy"
                ? "🟢 Healthy"
                : "🔴 Offline"}
            </h3>

            <p>
              Service:
              {" "}
              {health.service ||
                "NexaDesk AI"}
            </p>

          </>

        ) : (

          <p>
            Checking system...
          </p>

        )}
      </div>

      <br />

      {/* Theme */}

      <div
        className="settings-card"
      >

        <h2>
          Theme Settings
        </h2>

        <br />

        <button
          className="theme-btn"
          onClick={() =>
            document.documentElement
              .style
              .setProperty(
                "--primary-color",
                "#2563eb"
              )
          }
        >
          Blue
        </button>

        <button
          className="theme-btn"
          onClick={() =>
            document.documentElement
              .style
              .setProperty(
                "--primary-color",
                "#16a34a"
              )
          }
        >
          Green
        </button>

        <button
          className="theme-btn"
          onClick={() =>
            document.documentElement
              .style
              .setProperty(
                "--primary-color",
                "#9333ea"
              )
          }
        >
          Purple
        </button>

      </div>

      <br />

      {/* Security */}

      <div
        className="settings-card"
      >
        <h2>
          Security
        </h2>

        <p>
          API Key Authentication
          Enabled
        </p>
      </div>

      <br />

      {/* About */}

      <div
        className="settings-card"
      >
        <h2>
          About NexaDesk AI
        </h2>

        <p>
          AI Banking &
          Customer Support
          Platform
        </p>
      </div>

    </div>
  );
}

export default SettingsPage;
