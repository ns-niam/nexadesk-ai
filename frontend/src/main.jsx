import React from "react";
import ReactDOM from "react-dom/client";

import { GoogleOAuthProvider }
from "@react-oauth/google";

import App from "./App";

import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <GoogleOAuthProvider
    clientId="400661562109-jm2ofdrv7mn7vv73evqvo9dvodfh1e25.apps.googleusercontent.com"
  >

    <App />

  </GoogleOAuthProvider>

);
