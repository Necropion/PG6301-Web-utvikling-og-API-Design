import User from "../models/userModel.js";
export { loginPOST, loginGET, loginDELETE };

const loginPOST = (req, res, next) => {
  res.cookie("username", req.body.username, { signed: true });
  res.sendStatus(204);
  next();
};

const loginGET = async (req, res) => {
  const { username } = req.signedCookies;

  const user = await User.find({ username }).then((data) => {
    return data;
  });

  res.status(200).json(user[0]);
};

const loginDELETE = async (req, res) => {
  res.clearCookie("username");
  res.clearCookie("access_token");

  res.sendStatus(204);
};
