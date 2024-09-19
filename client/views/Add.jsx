import Header from "../components/view/Header";
import Footer from "../components/view/Footer";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import useLoginContext from "../hooks/useLoginContext";
import Navigation from "../components/view/Navigation";
import ProfileCard from "../components/view/ProfileCard";

const Add = () => {
  const addNav = useNavigate();

  const { username, userID, googleName, googleEmail, loadUser } =
    useContext(useLoginContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [inputError, setInputError] = useState("");

  const checkAvailability = async (e) => {
    e.preventDefault();

    const searchChat = await fetch("/api/chat/availibility/" + title);

    const foundChat = await searchChat.json();

    if (!searchChat.ok) {
      console.log("Something went wrong when trying to create a chat");
    }

    if (searchChat.ok) {
      if (foundChat.availibility === "available") {
        await handleAdd();
        setInputError("");
      }

      if (foundChat.availibility === "unavailable") {
        setInputError(
          "Sorry but the name for that chat is already taken, try a different one",
        );
      }
    }
  };

  const handleAdd = async () => {
    if (username) {
      const newChat = {
        title,
        description,
        user: username,
        userID: userID.toString(),
      };

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          body: JSON.stringify(newChat),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.log(
            `Something went wrong while posting new task: ${response.status} ${response.statusText}`,
          );
        }

        if (response.ok) {
          console.log("Task added successfully!");
          addNav("/my-tasks");
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (googleName) {
      const newChat = {
        title,
        description,
        user: googleName,
        userID: googleEmail.toString(),
      };

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          body: JSON.stringify(newChat),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.log(
            `Something went wrong while posting new task: ${response.status} ${response.statusText}`,
          );
        }

        if (response.ok) {
          console.log("Task added successfully!");
          addNav("/my-tasks");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
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
            <div className="addOutput">
              <div></div>
              <form className="addTask" onSubmit={checkAvailability}>
                <h3>Add Chat</h3>
                <p>{inputError}</p>
                <div className="inputDiv">
                  <div className="title">
                    <p>Title</p>
                    <input
                      type="text"
                      placeholder="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="description">
                    <p>Description</p>
                    <input
                      className="descriptionInput"
                      type="text"
                      placeholder="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                  <div className="status">
                    <p></p>
                    <div></div>
                  </div>
                </div>
                <button className="viewBtn" value="addTask">
                  Add
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

export default Add;
