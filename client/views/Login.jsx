import Header from "../components/view/Header";
import Footer from "../components/view/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UseLoginContext from "../hooks/useLoginContext";
import LoginGoogleOpenID from "../components/login/LoginGoogleOpenID";

const Login = () => {
  const { loadUser } = useContext(UseLoginContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const loginPOST = async () => {
    try {
      const postCookies = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ username }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (postCookies.ok) {
        console.log("Login cookies posted");
      }

      if (!postCookies.ok) {
        console.log(
          `Error posting login cookies ${postCookies.status} ${postCookies.statusText}`,
        );
      }
    } catch (error) {
      console.log(`Error in loginPOST: ${error}`);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const validateCredentials = await fetch(
        `/api/user/validate/${username}&${password}`,
      );
      const loginInfo = await validateCredentials.json();

      if (!validateCredentials.ok) {
        console.log(
          "Something went wrong while validating " +
            validateCredentials.status +
            " " +
            validateCredentials.statusText,
        );
      }

      if (validateCredentials.ok) {
        console.log(
          `Here is the login result: ` + JSON.stringify(loginInfo.validation),
        );

        if (loginInfo.validation === "successful") {
          setMessage(null);
          await loginPOST();
          window.sessionStorage.setItem("username", username);
          navigate("/home");
        }

        if (loginInfo.validation === "failed") {
          setMessage("Incorrect Username and/or Password, try again.");
        }
      }
    } catch (error) {
      console.log("Error in handleLogin: " + error);
    }
  };

  return (
    <div className="application">
      <div className="header">
        <Header />
      </div>
      <div className="main">
        <form className="loginForm" onSubmit={handleLogin}>
          <h2>Login</h2>
          <p>{message}</p>
          <input
            className="inputField"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="inputField"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="loginBtn">Sign in</button>
          <LoginGoogleOpenID />
          <Link to="/register">
            <button className="registerBtn">Register</button>
          </Link>
        </form>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Login;
