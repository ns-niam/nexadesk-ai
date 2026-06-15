

const API_KEY = "nexadesk-secret-key";

const API_URL =
"https://nexadesk-ai-production.up.railway.app";
//Headers

const headers = {
"Content-Type":
"application/json",

"X-API-Key":
API_KEY,
};

// Chat

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

      headers,

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
    `${BASE_URL}/dashboard`,
    {
      headers,
    }
  );

return response.json();


};

// Open Tickets

export const getOpenTickets =
async () => {


const response =
  await fetch(
    `${BASE_URL}/open-tickets`,
    {
      headers,
    }
  );

return response.json();


};

// Closed Tickets

export const getClosedTickets =
async () => {


const response =
  await fetch(
    `${BASE_URL}/closed-tickets`,
    {
      headers,
    }
  );

return response.json();


};

// Customer Activity

export const getCustomerActivity =
async () => {


const response =
  await fetch(
    `${BASE_URL}/customer-activity`,
    {
      headers,
    }
  );

return response.json();


};

// Feedbacks

export const getFeedbacks =
async () => {


const response =
  await fetch(
    `${BASE_URL}/feedbacks`,
    {
      headers,
    }
  );

return response.json();


};
