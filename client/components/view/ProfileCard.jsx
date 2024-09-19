import { useContext } from "react";
import useLoginContext from "../../hooks/useLoginContext";

const ProfileCard = () => {
  const { username, userID, googleName, googleEmail, googleImg } =
    useContext(useLoginContext);

  if (username) {
    return (
      <div className="profileDiv">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
          placeholder="No Image"
          alt="No Image"
        />
        <h3>User</h3>
        <p>{`Username: ${username}`}</p>
        <p>{`UserID: ${userID}`}</p>
      </div>
    );
  }

  if (googleName) {
    return (
      <div className="profileDiv">
        <img src={googleImg} />
        <h3>User</h3>
        <p>{`Name: ${googleName}`}</p>
        <p>{`Email: ${googleEmail}`}</p>
        <p>{"Bio: "}</p>
      </div>
    );
  }
};

export default ProfileCard;
