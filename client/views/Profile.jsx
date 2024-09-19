import Header from "../components/view/Header";
import Footer from "../components/view/Footer";
import { useContext, useEffect, useState } from "react";
import useLoginContext from "../hooks/useLoginContext";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/view/Navigation";
import ProfileCard from "../components/view/ProfileCard";

const Profile = () => {
  const { loadUser } = useContext(useLoginContext);

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
            <ProfileCard />
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
