import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import useLoginContext from "../../hooks/useLoginContext";

const Navigation = () => {
  const navigate = useNavigate();
  const { username, googleName } = useContext(useLoginContext);

  const handleClick = async (e) => {
    e.preventDefault();

    if (e.target.value === "home") {
      navigate("/home");
    }

    if (e.target.value === "my-tasks") {
      navigate("/my-tasks");
    }

    if (e.target.value === "profile") {
      navigate("/profile");
    }

    if (e.target.value === "logout") {
      const response = await fetch("/api/login", {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(
          `Something went wrong ${response.status} ${response.statusText}`,
        );
      }

      if (response.ok) {
        window.sessionStorage.clear();
        navigate("/");
      }
    }
  };

  return (
    <div className="viewDiv">
      <h1 className="viewHeader">Welcome {googleName || username}</h1>
      <button className="viewBtn" value="home" onClick={handleClick}>
        Home
      </button>
      <button className="viewBtn" value="my-tasks" onClick={handleClick}>
        My Chats
      </button>
      <button className="viewBtn" value="profile" onClick={handleClick}>
        Profile
      </button>
      <button className="viewBtn" value="logout" onClick={handleClick}>
        Sign out
      </button>
    </div>
  );
};

export default Navigation;
