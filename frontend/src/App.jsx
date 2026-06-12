import { useState } from "react";

import "./App.css";
import ChatPage
from "./pages/ChatPage";


import Sidebar from "./components/Sidebar";

import DashboardPage from "./pages/DashboardPage";
import TicketsPage from "./pages/TicketsPage";
import AnalyticsPage from "./pages/AnalyticsPage";

function App() {

  // States

  const [activePage,
    setActivePage] =
    useState("Chat");



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

      case "Settings":
        return (
          <div
            style={{
              padding: "30px",
              color: "white",
            }}
          >
            <h1>
              Settings
            </h1>
          </div>
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
