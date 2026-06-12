

const BASE_URL =
  "https://crispy-rotary-phone-q749q77g55jv29vrg-8000.app.github.dev";



export const sendChatMessage =
  async (
    sessionId,
    message
  ) => {

    const response =
      await fetch(
        `${BASE_URL}/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            session_id:
              sessionId,
            message,
          }),
        }
      );

    return response.json();
  };

// Dashboard

export const getDashboard =
  async () => {

    const response =
      await fetch(
        `${BASE_URL}/dashboard`
      );

    return response.json();
  };

// Open Tickets

export const getOpenTickets =
  async () => {

    const response =
      await fetch(
        `${BASE_URL}/open-tickets`
      );

    return response.json();
  };

// Closed Tickets

export const getClosedTickets =
  async () => {

    const response =
      await fetch(
        `${BASE_URL}/closed-tickets`
      );

    return response.json();
  };

// Customer Activity

export const getCustomerActivity =
  async () => {

    const response =
      await fetch(
        `${BASE_URL}/customer-activity`
      );

    return response.json();
  };

// Feedbacks

export const getFeedbacks =
  async () => {

    const response =
      await fetch(
        `${BASE_URL}/feedbacks`
      );

    return response.json();
  };
