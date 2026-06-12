function StatsCard({
  title,
  value
}) {
  return (
    <div
      style={{
        background: "#111827",
        padding: "20px",
        borderRadius: "16px",
        border:
          "1px solid #374151",
        minWidth: "220px",
      }}
    >
      <h4
        style={{
          color: "#94a3b8",
          marginBottom: "10px",
        }}
      >
        {title}
      </h4>

      <h2
        style={{
          color: "white",
        }}
      >
        {value}
      </h2>
    </div>
  );
}

export default StatsCard;
