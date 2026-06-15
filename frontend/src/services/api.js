const API_KEY = "nexadesk-secret-key";

const BASE_URL =
  "https://nexadesk-ai-production.up.railway.app";

// Headers

const headers = {
  "Content-Type": "application/json",
  "X-API-Key": API_KEY,
};

// Chat

export const sendChatMessage = async (
  sessionId,
  message
) => {

  const response = await fetch(
    `${BASE_URL}/chat`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        session_id: sessionId,
        message: message,
      }),
    }
  );

  return response.json();
};

// Dashboard

export const getDashboard = async () => {

  const response = await fetch(
    `${BASE_URL}/dashboard`,
    {
      headers,
    }
  );

  return response.json();
};

// Open Tickets

export const getOpenTickets = async () => {

  const response = await fetch(
    `${BASE_URL}/open-tickets`,
    {
      headers,
    }
  );

  return response.json();
};

// Closed Tickets

export const getClosedTickets = async () => {

  const response = await fetch(
    `${BASE_URL}/closed-tickets`,
    {
      headers,
    }
  );

  return response.json();
};

// Customer Activity

export const getCustomerActivity = async () => {

  const response = await fetch(
    `${BASE_URL}/customer-activity`,
    {
      headers,
    }
  );

  return response.json();
};

// Feedbacks

export const getFeedbacks = async () => {

  const response = await fetch(
    `${BASE_URL}/feedbacks`,
    {
      headers,
    }
  );

  return response.json();
};


// Ticket In Progress

export const markTicketInProgress =
async (ticketId) => {

  const response =
    await fetch(
      `${BASE_URL}/ticket-progress?ticket_id=${ticketId}`,
      {
        method: "PUT",
        headers,
      }
    );

  return response.json();
};

// Close Ticket

export const closeTicket =
async (ticketId) => {

  const response =
    await fetch(
      `${BASE_URL}/ticket-close?ticket_id=${ticketId}`,
      {
        method: "PUT",
        headers,
      }
    );

  return response.json();
};


export const submitFeedback =
async (
  ticketId,
  rating,
  comment
) => {

  const response =
    await fetch(
      `${BASE_URL}/feedback?ticket_id=${ticketId}&rating=${rating}&comment=${encodeURIComponent(comment)}`,
      {
        method: "POST",
        headers,
      }
    );

  return response.json();
};


// Ticket Status

export const getTicketStatus =
async (ticketId) => {

  const response =
    await fetch(
      `${BASE_URL}/ticket-status?ticket_id=${ticketId}`,
      {
        headers,
      }
    );

  return response.json();
};
