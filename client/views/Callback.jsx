import Header from "../components/view/Header";
import Footer from "../components/view/Footer";
import { useContext, useEffect, useState } from "react";
import useLoginContext from "../hooks/useLoginContext";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const profileNav = useNavigate();
  const [debug, setDebug] = useState();
  const { loadUser } = useContext(useLoginContext);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      if (e.target.value === "home") {
        profileNav("/home");
      }

      if (e.target.value === "profile") {
        profileNav("/profile");
      }

      if (e.target.value === "logout") {
        const response = await fetch("/api/login", {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(
            `Something wnt wrong ${response.status} ${response.statusText}`,
          );
        }

        if (response.ok) {
          profileNav("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCallback = async () => {
    try {
      const hashObject = Object.fromEntries(
        new URLSearchParams(window.location.hash.substring(1)),
      );
      const { access_token } = hashObject;

      const response = await fetch("/api/google", {
        method: "POST",
        body: JSON.stringify({ access_token }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorMsg = `Failed POST '/api/google': ${response.status} ${response.statusText}`;
        setDebug(errorMsg);
      }

      if (response.ok) {
        await fetchGoogle();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGoogle = async () => {
    try {
      const response = await fetch("/api/google");

      const userInfo = await response.json();

      window.sessionStorage.setItem("googleName", userInfo.name);
      window.sessionStorage.setItem("googleEmail", userInfo.email);
      window.sessionStorage.setItem("googleImg", userInfo.picture);
      await checkGoogleUser(userInfo.name, userInfo.picture, userInfo.email);
      profileNav("/home");
    } catch (error) {
      console.log("Error while trying to fetch googleUser: " + error);
    }
  };

  const checkGoogleUser = async (name, img, email) => {
    try {
      const checkUser = await fetch("/api/google/user/" + email);

      const foundUser = await checkUser.json();

      if (checkUser.ok) {
        if (foundUser.search === "failed") {
          await createGoogleUser(name, img, email);
        }
      }

      if (!checkUser.ok) {
        console.log("Something went wrong checking the user ");
      }
    } catch (error) {
      console.log("Error while checking for google user " + error);
    }
  };

  const createGoogleUser = async (name, img, email) => {
    try {
      const googleCredentials = { name, img, email };

      const createUser = await fetch("/api/google/user", {
        method: "POST",
        body: JSON.stringify(googleCredentials),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (createUser.ok) {
        console.log("Google user added!");
      }
      if (!createUser.ok) {
        console.log("Something went wrong creating the user ");
      }
    } catch (error) {
      console.log("Error while trying to create google user " + error);
    }
  };

  useEffect(() => {
    handleCallback();
  });

  return (
    <div className="application">
      <div className="header">
        <Header />
      </div>
      <div className="main">
        <div className="view">
          <div className="viewDiv">
            <h1 className="viewHeader">Please Wait...</h1>
            <button className="viewBtn" value="home" onClick={handleClick}>
              Home
            </button>
            <button className="viewBtn" value="profile" onClick={handleClick}>
              Profile
            </button>
            <button className="viewBtn" value="logout" onClick={handleClick}>
              Sign out
            </button>
          </div>
          <div className="viewOutput">
            <pre>{debug}</pre>
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Callback;
