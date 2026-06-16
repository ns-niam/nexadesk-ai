import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import {
  registerUser
}
  from "../services/api";

function LoginPage({ setUser }) {

  const [role, setRole] =
    useState("customer");

  return (

    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #020617 0%, #07143a 100%)",
        color: "white",
        padding: "20px",
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "50px",
        }}
      >

        {/* Left Side */}

        <div
          style={{
            flex: 1,
          }}
        >

          <div
            style={{
              display: "inline-block",
              background: "#2563eb",
              padding: "8px 16px",
              borderRadius: "999px",
              marginBottom: "20px",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            AI Banking Platform Developed by Niam
          </div>

          <h1
            style={{
              fontSize: "72px",
              fontWeight: "800",
              marginTop: "10px",
              marginBottom: "20px",
              lineHeight: "1.1",
            }}
          >
            NexaDesk AI

          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "22px",
              marginBottom: "50px",
              maxWidth: "800px",
              whiteSpace: "nowrap",
              lineHeight: "1.6",
            }}
          >
            AI-Powered Banking &
            Customer Support Platform
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              color: "#d1d5db",
              fontSize: "22px",
              marginTop: "20px",
              alignItems: "flex-start",
            }}
          >
            <span>
              ✓ AI-Powered Banking Assistant
            </span>

            <span>
              ✓ Smart Ticket Management
            </span>

            <span>
              ✓ Human Agent Handoff
            </span>

            <span>
              ✓ Advanced Analytics Dashboard
            </span>

            <span>
              ✓ Audit Logs & System Monitoring
            </span>
          </div>

        </div>

        {/* Right Side */}


        <div
          style={{
            width: "380px",
            background:
              "rgba(17,24,39,0.92)",
            boxShadow:
              "0 20px 50px rgba(37,99,235,0.25)",
            border:
              "1px solid #374151",
            borderRadius: "20px",
            padding: "35px",
            backdropFilter:
              "blur(12px)",
          }}
        >

          <h2
            style={{
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            Welcome Back
          </h2>

          <p
            style={{
              textAlign: "center",
              color: "#9ca3af",
              marginBottom: "25px",
            }}
          >
            Sign in to continue
          </p>

          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#d1d5db",
            }}
          >
            Login As
          </label>

          <select
            value={role}
            onChange={(e) =>
              setRole(
                e.target.value
              )
            }
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border:
                "1px solid #374151",
              background:
                "#111827",
              color: "white",
              marginBottom: "25px",
            }}
          >

            <option value="customer">
              Customer
            </option>

            <option value="admin">
              Admin
            </option>

          </select>

          <div
            style={{
              display: "flex",
              justifyContent:
                "center",
            }}
          >

           <GoogleLogin

  onSuccess={async (
    credentialResponse
  ) => {

                const userInfo =
                  jwtDecode(
                    credentialResponse.credential
                  );

                let finalRole = "customer";

                if (
                  userInfo.email ===
                  "ns.niam.official@gmail.com"
                ) {
                  finalRole = "admin";
                }

                localStorage.setItem(
                  "role",
                  finalRole
                );

                localStorage.setItem(
                  "google_user",
                  JSON.stringify(
                    credentialResponse
                  )
                );

                localStorage.setItem(
                  "user_email",
                  userInfo.email
                );

                localStorage.setItem(
                  "user_name",
                  userInfo.name
                );

                await registerUser(
                  userInfo.name,
                  userInfo.email,
                  finalRole
                );

                setUser(
                  credentialResponse
                );
              }}

              onError={() => {

                alert(
                  "Google Login Failed"
                );
              }}

            />

          </div>

          <p
            style={{
              marginTop: "25px",
              fontSize: "13px",
              textAlign: "center",
              color: "#6b7280",
            }}
          >
            Secure authentication powered
            by Google OAuth 2.0
          </p>

          <p
            style={{
              marginTop: "20px",
              fontSize: "12px",
              textAlign: "center",
              color: "#94a3b8",
            }}
          >
            © 2026 NexaDesk AI
            <br />
            Developed by Niam
            <br />
            MIT Licensed
          </p>

        </div>

      </div>

    </div>

  );
}

export default LoginPage;
