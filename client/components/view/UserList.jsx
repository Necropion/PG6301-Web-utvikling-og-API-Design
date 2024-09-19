import { useContext } from "react";
import useLoginContext from "../../hooks/useLoginContext";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const navigate = useNavigate();
  const { userList, googleUserList } = useContext(useLoginContext);

  const handleUserClick = (username) => {
    window.sessionStorage.setItem("viewUserName", username);
    window.sessionStorage.setItem(
      "viewUserImg",
      "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
    );
    navigate("/user");
  };

  const handleGoogleUserClick = (name, img, email) => {
    window.sessionStorage.setItem("viewGoogleName", name);
    window.sessionStorage.setItem("viewGoogleImg", img);
    window.sessionStorage.setItem("viewGoogleEmail", email);
    navigate("/google-user");
  };

  return (
    <div className="searchDiv">
      <div>All Users</div>
      {userList.map((u, index) => (
        <div
          key={index}
          className="user"
          onClick={() => handleUserClick(u.username)}
        >
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
            placeholder="No Image"
            alt="No Image"
          />
          <p>{u.username}</p>
        </div>
      ))}
      {googleUserList.map((g, index) => (
        <div
          key={index}
          className="user"
          onClick={() => handleGoogleUserClick(g.name, g.img, g.email)}
        >
          <img src={g.img} />
          <p>{g.name}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
