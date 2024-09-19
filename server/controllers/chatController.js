import Chat from "../models/chatModel.js";
import { response } from "express";
import mongoose from "mongoose";
export {
  chatGETall,
  chatPOSTone,
  chatGETone,
  chatGETUser,
  chatGETavailibility,
  chatUPDATEone,
  chatDELETEone,
};

//Chat POST one
const chatPOSTone = async (req, res) => {
  const { title, description, user, userID } = req.body;

  try {
    const chat = await Chat.create({ title, description, user, userID });
    res.status(200).json(chat);
  } catch (error) {
    console.log(
      `Something went wrong while posting a new chat to database ${response.status} ${response.statusText}`,
    );
  }
};

//Chat GET all chats
const chatGETall = async (req, res) => {
  const chats = await Chat.find({}).sort({ createdAt: -1 });

  res.status(200).json(chats);
};

//Chat GET one
const chatGETone = async (req, res) => {
  const chatDetails = await Chat.findById(req.params.id.trim());

  console.log(chatDetails);
  res.status(200).json(chatDetails);
};

//Chat GET all from one user
const chatGETUser = async (req, res) => {
  console.log(req.params.userID);

  const userChats = await Chat.find({ userID: req.params.userID }).then(
    (data) => {
      return data;
    },
  );

  res.status(200).json(userChats);
};

//Chat check for chat name availability
const chatGETavailibility = async (req, res) => {
  console.log("Title: " + req.params.title);

  const findChat = await Chat.find({ title: req.params.title }).then((data) => {
    return data;
  });

  if (findChat.length !== 0) {
    if (findChat[0].title === req.params.title) {
      res.status(200).json({ availibility: "unavailable" });
    } else {
      res.status(200).json({ availibility: "available" });
    }
  } else {
    res.status(200).json({ availibility: "available" });
  }
};

//Chat update one chat
const chatUPDATEone = async (req, res) => {
  const { inputTitle, inputDescription } = req.body;

  const updateChat = await Chat.findOneAndUpdate(
    { _id: req.params.id.trim() },
    { title: inputTitle, description: inputDescription },
  );

  res.status(200).json(updateChat);
};

//Chat DELETE one
const chatDELETEone = async (req, res) => {
  const deleteChat = await Chat.findOneAndDelete({ _id: req.params.id.trim() });

  res.status(200).json(deleteChat);
};
