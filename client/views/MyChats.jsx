import Header from "../components/view/Header";
import Footer from "../components/view/Footer";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UseLoginContext from "../hooks/useLoginContext";
import Update from "./Update";
import Navigation from "../components/view/Navigation";
import ChatDelete from "../components/chat/ChatDelete";
import ProfileCard from "../components/view/ProfileCard";
import SearchCard from "../components/view/UserList";

const MyChats = () => {
  const [chats, setChats] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { username, userID, googleName, googleTasks, googleEmail, loadUser } =
    useContext(UseLoginContext);

  const handleClick = async (e) => {
    e.preventDefault();

    if (e.target.value === "add") {
      navigate("/add");
    }

    if (e.target.value === "update") {
      window.sessionStorage.setItem("chatID", e.target.id);
      navigate("/update");
    }

    if (e.target.value === "delete") {
      try {
        await ChatDelete(e.target.id);
      } catch (error) {
        console.log("Error while using delete button in home: " + error);
      }
    }
  };

  const fetchChats = async () => {
    if (username) {
      try {
        const response = await fetch("/api/chat/user/" + userID);
        const allTasks = await response.json();

        if (!response.ok) {
          setError(
            `Something went wrong while fetching tasks ${response.status} ${response.statusText}`,
          );
        }

        if (response.ok) {
          setError(null);
          setChats(allTasks);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (googleName) {
      try {
        const response = await fetch("/api/chat/user/" + googleEmail);
        const allChats = await response.json();

        if (!response.ok) {
          setError(
            `Something went wrong while fetching tasks ${response.status} ${response.statusText}`,
          );
        }

        if (response.ok) {
          setError(null);
          setChats(allChats);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchAndLoad = async () => {
    try {
      await loadUser();
      await fetchChats();
    } catch (error) {
      console.log("Error in fetchAndLoad function in MyChats" + error);
    }
  };

  useEffect(() => {
    fetchAndLoad();
  }, []);

  return (
    <div className="application">
      <div className="header">
        <Header />
      </div>
      <div className="main">
        <div className="view">
          <Navigation />
          <div className="viewOutput">
            <div className="taskDiv">
              <div className="taskHeader">
                <h3>My Chats</h3>
                <div className="searchBar"></div>
                <button className="viewBtn" value="add" onClick={handleClick}>
                  Add
                </button>
              </div>
              <div className="taskOutput">
                {chats.map((c, index) => (
                  <div key={index} className="taskCard">
                    <h4 className="title">{c.title}</h4>
                    <p className="description">{c.description}</p>
                    <p className="status">User: {c.user}</p>
                    <button
                      className="deleteBtn"
                      value="delete"
                      id={c._id}
                      onClick={handleClick}
                    >
                      Delete
                    </button>
                    <button
                      className="updateBtn"
                      value="update"
                      id={c._id}
                      onClick={handleClick}
                    >
                      Update
                    </button>
                  </div>
                ))}
              </div>
              <ProfileCard />
              <SearchCard />
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default MyChats;
