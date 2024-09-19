import ChatDelete from "./ChatDelete";
import { useContext } from "react";
import useLoginContext from "../../hooks/useLoginContext";
import { useNavigate } from "react-router-dom";

const ChatEdit = ({ c }) => {
  const navigate = useNavigate();
  const { userType } = useContext(useLoginContext);

  const handleClick = async (e) => {
    e.preventDefault();

    if (e.target.value === "add") {
      navigate("/add");
    }

    if (e.target.value === "chat") {
      window.sessionStorage.setItem("chatID", e.target.id);
      window.sessionStorage.setItem("chatTitle", c.title);
      navigate("/chat");
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

  if (userType === "admin") {
    return (
      <div className="editDiv">
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
    );
  }

  return (
    <div className="editDiv">
      <button
        className="deleteBtn"
        value="chat"
        id={c._id}
        onClick={handleClick}
      >
        Enter
      </button>
      <div></div>
    </div>
  );
};

export default ChatEdit;
