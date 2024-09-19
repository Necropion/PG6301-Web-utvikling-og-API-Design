import Header from "../components/view/Header";
import Footer from "../components/view/Footer";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UseLoginContext from "../hooks/useLoginContext";
import Update from "./Update";
import Navigation from "../components/view/Navigation";
import ChatDelete from "../components/chat/ChatDelete";
import ChatEdit from "../components/chat/ChatEdit";
import ChatAddButton from "../components/chat/ChatAddButton";
import ProfileCard from "../components/view/ProfileCard";
import SearchCard from "../components/view/UserList";
import UserList from "../components/view/UserList";

const Home = () => {
  const [chats, setChats] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { loadUser } = useContext(UseLoginContext);

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/chat");
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
  };

  const fetchAndLoad = async () => {
    try {
      await fetchTasks();
    } catch (error) {
      console.log("Error in fetchAndLoad function in MyChats" + error);
    }
  };

  useEffect(() => {
    fetchAndLoad();
    loadUser();
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
                <h3>All Chat Rooms</h3>
                <input className="searchBar" type="text" placeholder="Search" />
                <ChatAddButton />
              </div>
              <div className="taskOutput">
                {chats.map((c, index) => (
                  <div key={index} className="taskCard">
                    <h4 className="title">{c.title}</h4>
                    <p className="description">Description: {c.description}</p>
                    <p className="status">User: {c.user}</p>
                    <ChatEdit c={c} />
                  </div>
                ))}
              </div>
              <ProfileCard />
              <UserList />
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

export default Home;
