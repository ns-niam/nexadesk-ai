
import SettingsPage
  from "./pages/SettingsPage";
import "./App.css";
import ChatPage
  from "./pages/ChatPage";
import AuditLogsPage
  from "./pages/AuditLogsPage";

import HistoryPage
  from "./pages/HistoryPage";

import Sidebar from "./components/Sidebar";
import { useState } from "react";
import DashboardPage from "./pages/DashboardPage";
import TicketsPage from "./pages/TicketsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import LoginPage
  from "./pages/LoginPage";
import ConversationsPage
  from "./pages/ConversationsPage";

function App() {

  // States

  const [activePage,
    setActivePage] =
    useState("Chat");

  const [theme, setTheme] =
    useState("blue");
  const [user, setUser] =
    useState(

      JSON.parse(
        localStorage.getItem(
          "google_user"
        )
      )

    );
  if (!user) {

    return (
      <LoginPage
        setUser={setUser}
      />
    );
  }
  // Page Router

  const renderPage = () => {

    switch (
    activePage
    ) {

      case "Dashboard":
        return (
          <DashboardPage />
        );

      case "Tickets":
        return (
          <TicketsPage />
        );

      case "Analytics":
        return (
          <AnalyticsPage />
        );
      case "Audit Logs":
        return (
          <AuditLogsPage />
        );

      case "Settings":
        return (
          <SettingsPage />
        );
      case "History":
        return (
          <HistoryPage />
        );
      case "Conversations":
        return (
          <ConversationsPage />
        );

      default:
        return (
          <ChatPage />
        );
    }
  };

  return (
    <div className="app">

      <Sidebar
        activePage={
          activePage
        }
        setActivePage={
          setActivePage
        }
      />

      <div
        className="chat-container"
      >
        {renderPage()}
      </div>

    </div>
  );
}

export default App;
