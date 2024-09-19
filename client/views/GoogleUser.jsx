import Header from "../components/view/Header";
import Footer from "../components/view/Footer";
import Navigation from "../components/view/Navigation";

const GoogleUser = () => {
  return (
    <div className="application">
      <div className="header">
        <Header />
      </div>
      <div className="main">
        <div className="view">
          <Navigation />
          <div className="viewOutput">
            <div className="profileDiv">
              <img src={window.sessionStorage.getItem("viewGoogleImg")} />
              <h3>User</h3>
              <p>{`Name: ${window.sessionStorage.getItem(
                "viewGoogleName",
              )}`}</p>
              <p>{`Email: ${window.sessionStorage.getItem(
                "viewGoogleEmail",
              )}`}</p>
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

export default GoogleUser;
