function Sidebar({
activePage,
setActivePage
}) {

const menuItems = [
"Chat",
"History",
"Dashboard",
"Tickets",
"Analytics",
"Audit Logs",
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
