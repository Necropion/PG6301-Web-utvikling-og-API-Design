import { useEffect, useState } from "react";

const LoginGoogleOpenID = () => {
  const [authURL, setAuthURL] = useState("");

  const google_discovery_url =
    "https://accounts.google.com/.well-known/openid-configuration";
  const google_client_id =
    "673274078987-vv9i592bvrr7fff9o7mfftnfg5kfspgu.apps.googleusercontent.com";

  const loadAuthURL = async () => {
    try {
      const response = await fetch(google_discovery_url);

      if (response.ok) {
        const discoveryDoc = await response.json();

        const params = {
          response_type: "token",
          scope: "email profile",
          client_id: google_client_id,
          redirect_uri: window.location.origin + "/callback",
        };

        setAuthURL(
          discoveryDoc.authorization_endpoint +
            "?" +
            new URLSearchParams(params),
        );
      }

      if (!response.ok) {
        const errorMsg = `Failed fetching 'discovery url': ${response.status} ${response.statusText}`;
        console.log(errorMsg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadAuthURL();
  }, []);

  return (
    <a className="googleBtn" href={authURL}>
      Google
    </a>
  );
};

export default LoginGoogleOpenID;
