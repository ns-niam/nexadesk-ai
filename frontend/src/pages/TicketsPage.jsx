import {
  useEffect,
  useState
} from "react";

import {
  getOpenTickets,
  getClosedTickets,
  markTicketInProgress,
  closeTicket,
  submitFeedback
}
  from "../services/api";

function TicketsPage() {

  const [
    openTickets,
    setOpenTickets
  ] = useState([]);

  const [
    feedbackText,
    setFeedbackText
  ] = useState("");

  const [
    rating,
    setRating
  ] = useState(5);

  const [
    closedTickets,
    setClosedTickets
  ] = useState([]);

  const loadTickets =
    async () => {

      try {

        const openData =
          await getOpenTickets();

        const closedData =
          await getClosedTickets();

        setOpenTickets(
          openData.tickets || []
        );

        setClosedTickets(
          closedData.tickets || []
        );

      } catch (
      error
      ) {

        console.log(error);
      }

    };

  useEffect(() => {

    loadTickets();

  }, []);

  const handleProgress =
    async (ticketId) => {

      try {

        await markTicketInProgress(
          ticketId
        );

        await loadTickets();

      } catch (
      error
      ) {

        console.log(error);
      }

    };

  const handleClose =
    async (ticketId) => {

      try {

        await closeTicket(
          ticketId
        );

        await loadTickets();

      } catch (
      error
      ) {

        console.log(error);
      }

    };

  const handleFeedback =
    async (ticketId) => {

      try {

        await submitFeedback(
          ticketId,
          rating,
          feedbackText
        );

        alert(
          "Feedback submitted successfully"
        );

        setFeedbackText("");

        setRating(5);

        await loadTickets();

      } catch (
      error
      ) {

        console.log(error);
      }
    };

  return (

    <div
      style={{
        padding: "30px",
        color: "white",
        overflowY: "auto",
        height: "100vh",
      }}
    >

      <h1>
        Ticket Management
      </h1>

      <br />

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px",
        }}
      >

        <div
          style={{
            background: "#1f2937",
            padding: "20px",
            borderRadius: "14px",
            minWidth: "220px",
          }}
        >
          <h3>
            Open Tickets
          </h3>

          <h1>
            {openTickets.length}
          </h1>
        </div>

        <div
          style={{
            background: "#1f2937",
            padding: "20px",
            borderRadius: "14px",
            minWidth: "220px",
          }}
        >
          <h3>
            Closed Tickets
          </h3>

          <h1>
            {closedTickets.length}
          </h1>
        </div>

      </div>

      <h2>
        Open Tickets
      </h2>

      <br />

      {openTickets.length === 0 ? (

        <p>
          No open tickets found.
        </p>

      ) : (

        openTickets.map(
          (
            ticket,
            index
          ) => (

            <div
              key={index}
              style={{
                background: "#1f2937",
                padding: "18px",
                marginBottom: "15px",
                borderRadius: "14px",
                border:
                  "1px solid #374151",
              }}
            >

              <h3>
                Ticket ID:
                {" "}
                {ticket[1]}
              </h3>

              <p>
                Customer:
                {" "}
                {ticket[2]}
              </p>

              <p>
                Intent:
                {" "}
                {ticket[3]}
              </p>

              <span
                style={{
                  background: "#16a34a",
                  padding: "4px 10px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                {ticket[4]}
              </span>

              <div
                style={{
                  marginTop: "15px",
                  display: "flex",
                  gap: "10px",
                }}
              >

                <button
                  onClick={() =>
                    handleProgress(
                      ticket[1]
                    )
                  }
                  style={{
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  In Progress
                </button>

                <button
                  onClick={() =>
                    handleClose(
                      ticket[1]
                    )
                  }
                  style={{
                    background: "#dc2626",
                    color: "white",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Close Ticket
                </button>

              </div>

            </div>

          )
        )

      )}

      <br />
      <br />

      <h2>
        Closed Tickets
      </h2>

      <br />

      {closedTickets.length === 0 ? (

        <p>
          No closed tickets found.
        </p>

      ) : (

        closedTickets.map(
          (
            ticket,
            index
          ) => (

            <div
              key={index}
              style={{
                background: "#1f2937",
                padding: "18px",
                marginBottom: "15px",
                borderRadius: "14px",
                border:
                  "1px solid #374151",
              }}
            >

              <h3>
                Ticket ID:
                {" "}
                {ticket[1]}
              </h3>

              <p>
                Customer:
                {" "}
                {ticket[2]}
              </p>

              <p>
                Intent:
                {" "}
                {ticket[3]}
              </p>

              <span
                style={{
                  background: "#dc2626",
                  padding: "4px 10px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                {ticket[4]}
              </span>

              <div
                style={{
                  marginTop: "15px",
                }}
              >

                <select
                  value={rating}
                  onChange={(e) =>
                    setRating(
                      e.target.value
                    )
                  }
                  style={{
                    padding: "8px",
                    marginBottom: "10px",
                    width: "100%",
                  }}
                >
                  <option value="5">
                    ⭐⭐⭐⭐⭐
                  </option>

                  <option value="4">
                    ⭐⭐⭐⭐
                  </option>

                  <option value="3">
                    ⭐⭐⭐
                  </option>

                  <option value="2">
                    ⭐⭐
                  </option>

                  <option value="1">
                    ⭐
                  </option>

                </select>

                <textarea
                  placeholder="Write feedback..."
                  value={feedbackText}
                  onChange={(e) =>
                    setFeedbackText(
                      e.target.value
                    )
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                />

                <button
                  onClick={() =>
                    handleFeedback(
                      ticket[1]
                    )
                  }
                  style={{
                    background: "#16a34a",
                    color: "white",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Submit Feedback
                </button>

              </div>

              <div
                style={{
                  marginTop: "15px",
                }}
              >
                
              </div>

            </div>

          )
        )

      )}

    </div>

  );
}

export default TicketsPage;
