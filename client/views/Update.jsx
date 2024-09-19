import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import useLoginContext from "../hooks/useLoginContext";
import Header from "../components/view/Header";
import Footer from "../components/view/Footer";
import Navigation from "../components/view/Navigation";
import ChatEdit from "../components/chat/ChatEdit";
import ProfileCard from "../components/view/ProfileCard";

const Update = () => {
  const addNav = useNavigate();

  const { loadUser, taskID } = useContext(useLoginContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState("");

  //Input
  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [message, setMessage] = useState(
    "Please fill out all fields before submitting",
  );

  const fetchChat = async () => {
    const chatDetails = await fetch(
      "/api/chat/" + window.sessionStorage.getItem("chatID"),
    );

    const { title, description, user } = await chatDetails.json();

    if (chatDetails.ok) {
      setTitle(title);
      setDescription(description);
      setUser(user);

      console.log(title);
    }
  };

  const checkAvailability = async (e) => {
    e.preventDefault();

    const searchChat = await fetch("/api/chat/availibility/" + inputTitle);

    const foundChat = await searchChat.json();

    if (!searchChat.ok) {
      console.log("Something went wrong when trying to create a chat");
    }

    if (searchChat.ok) {
      if (foundChat.availibility === "available") {
        await handleUpdate();
        setMessage("");
      }

      if (foundChat.availibility === "unavailable") {
        setMessage(
          "Sorry but the name for that chat is already taken, try a different one",
        );
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const updateInput = { inputTitle, inputDescription };

      const update = await fetch(
        "/api/chat/" + window.sessionStorage.getItem("chatID"),
        {
          method: "PUT",
          body: JSON.stringify(updateInput),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const newChat = update.json();

      if (!update.ok) {
        setMessage("Something went wrong ehn trying to update task");
      }

      if (update.ok) {
        setTitle(inputTitle);
        setDescription(inputDescription);
        setInputTitle("");
        setInputDescription("");
        setMessage("Chat successfully updated!");
      }
    } catch (error) {
      console.log("Error while trying to update task: " + error);
    }
  };

  console.log("Here is task Id from Update: " + taskID);

  const fuseLoadAndFetch = async () => {
    await loadUser();
    await fetchChat();
  };

  useEffect(() => {
    fuseLoadAndFetch();
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
            <div className="updateOutput">
              <div></div>
              <div className="taskDetails">
                <h4 className="title">{title}</h4>
                <p className="description">{description}</p>
                <p className="status">User: {user}</p>
                <div className="editDiv"></div>
              </div>
              <form className="updateTask" onSubmit={checkAvailability}>
                <h3>Update Task</h3>
                <p>{message}</p>
                <div className="inputDiv">
                  <div className="title">
                    <p>Title</p>
                    <input
                      type="text"
                      placeholder="title"
                      value={inputTitle}
                      onChange={(e) => setInputTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="description">
                    <p>Description</p>
                    <input
                      className="descriptionInput"
                      type="text"
                      placeholder="description"
                      value={inputDescription}
                      onChange={(e) => setInputDescription(e.target.value)}
                      required
                    />
                  </div>
                  <div className="status"></div>
                </div>
                <button
                  className="viewBtn"
                  value="addTask"
                  onClick={checkAvailability}
                >
                  Update
                </button>
              </form>
              <ProfileCard />
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

export default Update;
