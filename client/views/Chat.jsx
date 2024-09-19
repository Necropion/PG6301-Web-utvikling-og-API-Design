import Header from "../components/view/Header";
import Footer from "../components/view/Footer";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import useLoginContext from "../hooks/useLoginContext";
import login from "./Login";
import Navigation from "../components/view/Navigation";
import ProfileCard from "../components/view/ProfileCard";
import * as events from "events";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import SearchCard from "../components/view/UserList";

const Chat = () => {
  const addNav = useNavigate();

  const { username, userID, googleName, googleEmail, loadActive, loadUser } =
    useContext(useLoginContext);
  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");
  const [msgs, setMsgs] = useState([]);

  //Users
  const [userList, setUserList] = useState([]);

  const [webSocket, setWebSocket] = useState();

  const sendMsg = async (e) => {
    e.preventDefault();

    if (username) {
      try {
        const msgContent = {
          content,
          user: username,
          userID,
          chatID: window.sessionStorage.getItem("chatID"),
        };

        const postMsg = await fetch("/api/msg", {
          method: "POST",
          body: JSON.stringify(msgContent),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const newMsg = await postMsg.json();

        if (postMsg.ok) {
          webSocket.send(JSON.stringify(newMsg));
          console.log("Message sent to socket: " + JSON.stringify(newMsg));
          setMsgs((current) => [...current, newMsg]);
          setContent("");
        }
      } catch (error) {
        console.log("Error in sendMsg: " + error);
      }
    }

    if (googleName) {
      try {
        const msgContent = {
          content,
          user: googleName,
          userID: googleEmail,
          chatID: window.sessionStorage.getItem("chatID"),
        };

        const postMsg = await fetch("/api/msg", {
          method: "POST",
          body: JSON.stringify(msgContent),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const newMsg = await postMsg.json();

        if (postMsg.ok) {
          webSocket.send(JSON.stringify(newMsg));
          setMsgs((current) => [...current, newMsg]);
          setContent("");
        }
      } catch (error) {
        console.log("Error in sendMsg: " + error);
      }
    }
  };

  const fetchMsgs = async () => {
    try {
      setTitle(window.sessionStorage.getItem("chatTitle"));
      const chatMsgs = await fetch(
        "/api/msg/chat/" + window.sessionStorage.getItem("chatID"),
      );

      const allMsgs = await chatMsgs.json();

      if (chatMsgs.ok) {
        setMsgs(allMsgs);
      }
    } catch (error) {
      console.log("Error in fetchMsgs: " + error);
    }
  };

  const fuseLoadAndFetch = async () => {
    await loadUser();
    await fetchMsgs();
    try {
      const webSocket = new WebSocket("wss://" + window.location.host);
      webSocket.onmessage = (event) => {
        const recievedMsg = JSON.parse(event.data);
        if (username && username !== recievedMsg.user) {
          setMsgs((current) => [...current, recievedMsg]);
        }
        if (googleName && googleName !== recievedMsg.user) {
          setMsgs((current) => [...current, recievedMsg]);
        }
      };
      setWebSocket(webSocket);
    } catch (error) {
      console.log(
        "Error in fuseAndLoadFetch while communicating with web socket " +
          error,
      );
    }
  };

  useEffect(() => {
    fuseLoadAndFetch();
  }, []);

  const bottomOfPanelRef = useRef(null);

  useEffect(() => {
    try {
      if (bottomOfPanelRef.current) {
        bottomOfPanelRef.current.scrollIntoView();
      }
    } catch (error) {
      console.log("Error in scroll useEffect: " + error);
    }
  }, [msgs]);

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
              <h3 className="chatHeader">Chat Room: {title}</h3>
              <div className="chatOutput">
                <div className="msgOutput">
                  {msgs.map((m, index) => (
                    <div key={index} className="msg">
                      <p>{`${m.user}: ${m.content}`}</p>
                    </div>
                  ))}
                  <div ref={bottomOfPanelRef}></div>
                </div>
                <div className="msgInput">
                  <form onSubmit={sendMsg}>
                    <input
                      type="text"
                      placeholder="Enter your message here"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                    <button className="deleteBtn">Send</button>
                  </form>
                </div>
              </div>
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

export default Chat;
