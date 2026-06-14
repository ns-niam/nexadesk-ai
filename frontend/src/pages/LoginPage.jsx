import { GoogleLogin }
from "@react-oauth/google";

function LoginPage({
  setUser
}) {

  return (

    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >

      <h1>
        NexaDesk AI
      </h1>

      <br />

      <GoogleLogin

        onSuccess={(
          credentialResponse
        ) => {

          localStorage.setItem(
            "google_user",
            JSON.stringify(
              credentialResponse
            )
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

  );
}

export default LoginPage;
