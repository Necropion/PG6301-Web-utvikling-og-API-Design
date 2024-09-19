import Header from "../components/view/Header";
import Footer from "../components/view/Footer";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import login from "./Login";

const Register = () => {
  const refresh = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [inputError, setInputError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== passwordCheck) {
      setInputError("Your password entries do not match , try again.");
    } else {
      const loginCredentials = { username, password };

      const registerUser = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify(loginCredentials),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!registerUser.ok) {
        setInputError("Something went wrong when registering a new user");
        console.log(
          `Something went wrong when registering a new user in the database ${registerUser.status} ${registerUser.statusText}`,
        );
      }

      if (registerUser.ok) {
        setInputError(
          `User ${loginCredentials.username} was successfully registered, you can now log in!`,
        );
        console.log(`Successfully created user: ${loginCredentials.username}`);
      }
    }
  };

  return (
    <div className="application">
      <div className="header">
        <Header />
      </div>
      <div className="main">
        <form className="registerForm" onSubmit={handleRegister}>
          <h2>Register</h2>
          <p>{inputError}</p>
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
          <input
            className="inputField"
            type="password"
            placeholder="Password"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            required
          />
          <Link to="/">
            <button className="backBtn">Back</button>
          </Link>
          <button className="registerBtn">Register</button>
        </form>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Register;
