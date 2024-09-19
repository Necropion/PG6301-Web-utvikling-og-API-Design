import { Navigate } from "react-router-dom";

const AccessControll = ({ children }) => {
  if (
    !window.sessionStorage.getItem("username") &&
    !window.sessionStorage.getItem("googleName")
  ) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AccessControll;
