function Sidebar({
  activePage,
  setActivePage
}) {

  const menuItems = [
    "Chat",
    "Dashboard",
    "Tickets",
    "Analytics",
    "Settings"
  ];

  return (
    <div className="sidebar">

      <h2>NexaDesk</h2>

      <button
        className="new-chat-btn"
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

    </div>
  );
}

export default Sidebar;
