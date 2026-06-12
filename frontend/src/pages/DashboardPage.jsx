import {
  useEffect,
  useState
}
from "react";

import {
  getDashboard
}
from "../services/api";

import StatsCard
from "../components/StatsCard";

function DashboardPage() {

  const [stats,
    setStats] =
    useState(null);

  useEffect(() => {

    const loadData =
      async () => {

      const data =
        await getDashboard();

      setStats(data);
    };

    loadData();

  }, []);

  if (!stats) {

    return (
      <h2>
        Loading Dashboard...
      </h2>
    );
  }

  return (
    <div
      style={{
        padding: "30px",
      }}
    >
      <h1
        style={{
          color: "white",
          marginBottom: "20px",
        }}
      >
        NexaDesk Dashboard
      </h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <StatsCard
          title="Messages"
          value={
            stats.total_messages
          }
        />

        <StatsCard
          title="Customers"
          value={
            stats.total_customers
          }
        />

        <StatsCard
          title="Open Tickets"
          value={
            stats.open_tickets
          }
        />

        <StatsCard
          title="Closed Tickets"
          value={
            stats.closed_tickets
          }
        />

        <StatsCard
          title="Average Rating"
          value={
            stats.average_rating
          }
        />
      </div>
    </div>
  );
}

export default DashboardPage;
