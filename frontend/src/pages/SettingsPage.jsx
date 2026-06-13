
function SettingsPage() {

  return (
    <div className="page-container">

      <h1>
        Settings
      </h1>

      <br />

      <div className="settings-card">
        <h2>
          Theme
        </h2>

        <p>
          Theme customization
          coming soon.
        </p>
      </div>

      <br />

      <div className="settings-card">
        <h2>
          Screen Recording
        </h2>

        <p>
          Record project demos
          directly from browser.
        </p>
      </div>

      <br />

      <div className="settings-card">
        <h2>
          Security
        </h2>

        <p>
          API Key Authentication Enabled
        </p>
      </div>

      <br />

      <div className="settings-card">
        <h2>
          About NexaDesk AI
        </h2>

        <p>
          AI Banking &
          Customer Support Platform
        </p>
      </div>

    </div>
  );
}

<div className="settings-card">

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


export default SettingsPage;
