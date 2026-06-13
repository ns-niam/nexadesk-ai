import {
  useEffect,
  useState
}
  from "react";

import {
  getOpenTickets,
  getClosedTickets
}
  from "../services/api";

function TicketsPage() {

  // States

  const [
    openTickets,
    setOpenTickets
  ] = useState([]);

  const [
    closedTickets,
    setClosedTickets
  ] = useState([]);

  // Effects

  useEffect(() => {

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

          console.log(
            error
          );
        }
      };

    loadTickets();

  }, []);

  // UI

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

      <h2>
        Open Tickets
      </h2>

      <br />

      {openTickets.map(
        (
          ticket,
          index
        ) => (

          <div
            key={index}
            style={{
              background:
                "#1f2937",
              padding:
                "12px",
              marginBottom:
                "10px",
              borderRadius:
                "10px",
            }}
          >
            <>
              <h3>
                Ticket ID:
                {ticket[1]}
              </h3>

              <p>
                Customer:
                {ticket[2]}
              </p>

              <p>
                Intent:
                {ticket[3]}
              </p>

              <p>
                Status:
                {ticket[4]}
              </p>
            </>
          </div>
        )
      )}

      <br />

      <h2>
        Closed Tickets
      </h2>

      <br />

      {closedTickets.map(
        (
          ticket,
          index
        ) => (

          <div
            key={index}
            style={{
              background:
                "#1f2937",

              padding:
                "18px",

              marginBottom:
                "15px",

              borderRadius:
                "14px",

              border:
                "1px solid #374151",
            }}
          >
            <>
              <h3>
                Ticket ID:
                {ticket[1]}
              </h3>

              <p>
                Customer:
                {ticket[2]}
              </p>

              <p>
                Intent:
                {ticket[3]}
              </p>

              <p>
                Status:
                {ticket[4]}
              </p>
            </>



          </div>
        )
      )}

    </div>
  );
}

export default TicketsPage;
