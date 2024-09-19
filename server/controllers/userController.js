import User from "../models/userModel.js";
import { response } from "express";
export { userPOST, userGETvalidate, userGETall };

//Register customer user POST
const userPOST = async (req, res) => {
  const { username, password } = req.body;

  console.log(req.body);

  try {
    const newUser = await User.create({
      username,
      password,
      userType: "customer",
    });
    res.status(200).json(newUser);
  } catch (error) {
    console.log(
      `Failed to register user in database: ${response.status} ${response.statusText}`,
    );
  }
};

//Validate user GET
const userGETvalidate = async (req, res) => {
  console.log("Username: " + req.params.username);
  console.log("Password: " + req.params.password);

  const user = await User.find({ username: req.params.username }).then(
    (data) => {
      return data;
    },
  );

  if (user.length !== 0) {
    if (
      user[0].username === req.params.username &&
      user[0].password === req.params.password
    ) {
      res.status(200).json({ validation: "successful" });
    } else {
      res.status(401).json({ validation: "failed" });
    }
  } else {
    res.status(401).json({ validation: "failed" });
  }
};

//Get all users
const userGETall = async (req, res) => {
  const userList = await User.find({}).sort({ createdAt: -1 });

  res.status(200).json(userList);
};
