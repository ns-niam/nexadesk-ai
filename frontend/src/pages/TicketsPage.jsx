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
            {
              JSON.stringify(
                ticket
              )
            }
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
                "12px",
              marginBottom:
                "10px",
              borderRadius:
                "10px",
            }}
          >
            {
              JSON.stringify(
                ticket
              )
            }
          </div>
        )
      )}

    </div>
  );
}

export default TicketsPage;
