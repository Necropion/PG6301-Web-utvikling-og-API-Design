import GoogleUser from "../models/googleUserModel.js";
import User from "../models/userModel.js";
export { googlePOST, googleGET, googlePOSTuser, googleGETuser, googleGETall };

const googlePOST = (req, res) => {
  res.cookie("access_token", req.body.access_token, { signed: true });
  res.sendStatus(204);
};

const fetchJSON = async (url, options) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    console.log(
      `Failed at fetchJSON in googleController ${response.status} ${response.statusText}`,
    );
  }

  return await response.json();
};

const googleGET = async (req, res) => {
  const { access_token } = req.signedCookies;

  const { userinfo_endpoint } = await fetchJSON(
    "https://accounts.google.com/.well-known/openid-configuration",
  );

  const userInfo = await fetchJSON(userinfo_endpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  res.json(userInfo);
};

const googlePOSTuser = async (req, res) => {
  const { name, img, email } = req.body;

  try {
    const newGoogle = await GoogleUser.create({ name, img, email });
    res.status(200).json(newGoogle);
  } catch (error) {
    console.log("failed to create google user " + error);
  }
};

const googleGETuser = async (req, res) => {
  console.log("Email: " + req.params.email);

  const googleUser = await GoogleUser.find({ email: req.params.email }).then(
    (data) => {
      return data;
    },
  );

  if (googleUser.length !== 0) {
    if (googleUser[0].email === req.params.email) {
      res.status(200).json({ search: "successful" });
    } else {
      res.status(200).json({ search: "failed" });
    }
  } else {
    res.status(200).json({ search: "failed" });
  }
};

//Get all google users
const googleGETall = async (req, res) => {
  const userList = await GoogleUser.find({}).sort({ createdAt: -1 });

  res.status(200).json(userList);
};
