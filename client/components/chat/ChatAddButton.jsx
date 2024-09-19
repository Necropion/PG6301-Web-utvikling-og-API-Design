import UseLoginContext from "../../hooks/useLoginContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const ChatAddButton = () => {
  const navigate = useNavigate();
  const handleClick = async (e) => {
    if (e.target.value === "add") {
      navigate("/add");
    }
  };

  const { userType } = useContext(UseLoginContext);

  if (userType === "admin") {
    return (
      <button className="viewBtn" value="add" onClick={handleClick}>
        Add
      </button>
    );
  } else {
  }
};

export default ChatAddButton;
