import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import MyChats from "./views/MyChats";
import "./app.css";
import UseLoginContext from "./hooks/useLoginContext";
import { useState } from "react";
import Profile from "./views/Profile";
import Add from "./views/Add";
import Callback from "./views/Callback";
import Register from "./views/Register";
import Update from "./views/Update";
import Home from "./views/Home";
import Chat from "./views/Chat";
import User from "./views/User";
import GoogleUser from "./views/GoogleUser";
import AccessControll from "./components/login/AccessControll";

const Application = () => {
  //Login Info
  const [username, setUsername] = useState("");
  const [userID, setUserID] = useState();
  const [userType, setUserType] = useState();

  //Google Login Info
  const [googleName, setGoogleName] = useState("");
  const [googleEmail, setGoogleEmail] = useState("");
  const [googleImg, setGoogleImg] = useState("");

  //Users
  const [userList, setUserList] = useState([]);
  const [googleUserList, setGoogleUserList] = useState([]);

  //Error
  const [error, setError] = useState(null);

  const fetchLogin = async () => {
    try {
      const response = await fetch("/api/login");

      if (!response.ok) {
        setError(
          `Something went wrong while fetching user ${response.status} ${response.statusText}`,
        );
      }

      if (response.ok) {
        setError(null);
      }

      const user = await response.json();
      setUsername(user.username);
      setUserID(user._id);
      setUserType(user.userType);
    } catch (error) {
      console.log("Error while trying to fetch loginUser: " + error);
    }
  };

  const fetchUserList = async () => {
    const getList = await fetch("/api/user");

    const list = await getList.json();

    setUserList(list);
  };

  const fetchGoogleUserList = async () => {
    const getList = await fetch("/api/google/all");

    const list = await getList.json();

    setGoogleUserList(list);
  };

  const loadUser = async () => {
    await fetchUserList();
    await fetchGoogleUserList();
    setUsername(window.sessionStorage.getItem("username"));

    //Google
    setGoogleName(window.sessionStorage.getItem("googleName"));
    setGoogleEmail(window.sessionStorage.getItem("googleEmail"));
    setGoogleImg(window.sessionStorage.getItem("googleImg"));
    console.log(username, googleName);
    try {
      if (username) {
        await fetchLogin();
      } else {
        console.log("no user");
      }
    } catch (error) {
      console.log("Error while trying to fetch users: " + error);
    }
  };

  return (
    <UseLoginContext.Provider
      value={{
        username,
        userID,
        userType,
        googleName,
        googleEmail,
        googleImg,
        googleUserList,
        userList,
        loadUser,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/callback" element={<Callback />} />
          <Route
            path="/home"
            element={
              <AccessControll>
                <Home />
              </AccessControll>
            }
          />
          <Route
            path="/my-tasks"
            element={
              <AccessControll>
                <MyChats />
              </AccessControll>
            }
          />
          <Route
            path="/add"
            element={
              <AccessControll>
                <Add />
              </AccessControll>
            }
          />
          <Route
            path="/profile"
            element={
              <AccessControll>
                <Profile />
              </AccessControll>
            }
          />
          <Route
            path="/update"
            element={
              <AccessControll>
                <Update />
              </AccessControll>
            }
          />
          <Route
            path="/chat"
            element={
              <AccessControll>
                <Chat />
              </AccessControll>
            }
          />
          <Route
            path="/user"
            element={
              <AccessControll>
                <User />
              </AccessControll>
            }
          />
          <Route
            path="/google-user"
            element={
              <AccessControll>
                <GoogleUser />
              </AccessControll>
            }
          />
        </Routes>
      </BrowserRouter>
    </UseLoginContext.Provider>
  );
};

export default Application;
