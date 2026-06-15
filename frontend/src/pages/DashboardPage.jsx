import {
  useEffect,
  useState
} from "react";

import {
  getDashboard
} from "../services/api";

import StatsCard
from "../components/StatsCard";

function DashboardPage() {

  const [
    stats,
    setStats
  ] = useState(null);

  useEffect(() => {

    const loadData =
      async () => {

      try {

        const data =
          await getDashboard();

        setStats(data);

      } catch (
        error
      ) {

        console.log(
          error
        );
      }
    };

    loadData();

  }, []);

  if (!stats) {

    return (

      <div
        style={{
          padding: "30px",
          color: "white",
        }}
      >
        <h2>
          Loading Dashboard...
        </h2>
      </div>

    );
  }

  return (

    <div
      style={{
        padding: "30px",
        color: "white",
        overflowY: "auto",
        height: "100vh",
      }}
    >

      <h1
        style={{
          marginBottom: "10px",
        }}
      >
        NexaDesk Dashboard
      </h1>

      <p
        style={{
          color: "#9ca3af",
          marginBottom: "35px",
        }}
      >
        Real-time overview of NexaDesk AI operations.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >

        <StatsCard
          title="💬 Messages"
          value={
            stats.total_messages || 0
          }
        />

        <StatsCard
          title="👥 Customers"
          value={
            stats.total_customers || 0
          }
        />

        <StatsCard
          title="🎫 Open Tickets"
          value={
            stats.open_tickets || 0
          }
        />

        <StatsCard
          title="✅ Closed Tickets"
          value={
            stats.closed_tickets || 0
          }
        />

        <StatsCard
          title="⭐ Average Rating"
          value={
            stats.average_rating
              ? Number(
                  stats.average_rating
                ).toFixed(1)
              : "0.0"
          }
        />

        <StatsCard
          title="🟢 System Status"
          value="ONLINE"
        />

      </div>

    </div>

  );
}

export default DashboardPage;
