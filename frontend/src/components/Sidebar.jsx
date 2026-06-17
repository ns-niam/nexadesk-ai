function Sidebar({
  activePage,
  setActivePage
}) {

  const role =
    localStorage.getItem(
      "role"
    ) || "customer";

  const menuItems =
    role === "admin"
      ? [
        "Dashboard",
        "Tickets",
        "Analytics",
        "Conversations",
        "Audit Logs",
        "Settings"
      ]
      : [
        "Chat",
        "History",
        "Settings"
      ];

  const handleLogout = () => {

    localStorage.clear();

    window.location.reload();

  };

  return (

    <div className="sidebar">

      <h2>
        NexaDesk
      </h2>

      <p
        style={{
          color: "#64748b",
          fontSize: "12px",
          marginTop: "-5px"
        }}
      >
        {localStorage.getItem(
          "user_name"
        )}
      </p>

      <p
        style={{
          color: "#94a3b8",
          fontSize: "13px",
          marginTop: "-5px",
          marginBottom: "20px",
        }}
      >
        {role === "admin"
          ? "Admin Portal"
          : "Customer Portal"}
      </p>

      <button
        className="new-chat-btn"
        onClick={() => {

          localStorage.removeItem(
            "nexadesk_messages"
          );

          setActivePage("Chat");

          window.location.reload();
        }}
      >
        + New Chat
      </button>

      {menuItems.map((item) => (

        <div
          key={item}
          className={
            activePage === item
              ? "sidebar-item active"
              : "sidebar-item"
          }
          onClick={() =>
            setActivePage(item)
          }
        >
          {item}
        </div>

      ))}

      <div
        style={{
          marginTop: "auto",
          paddingTop: "20px",
        }}
      >

        <div
          className="sidebar-item"
          onClick={handleLogout}
          style={{
            color: "#ef4444",
            fontWeight: "600",
          }}
        >
          Logout
        </div>

      </div>

    </div>

  );
}

export default Sidebar;
