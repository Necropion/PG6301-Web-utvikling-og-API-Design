import Msg from "../models/msgModel.js";
import { response } from "express";
export { msgGETall, msgPOSTone, msgGETchat };

//Msg GET all
const msgGETall = async (req, res) => {
  const chats = await Msg.find({}).sort({ createdAt: -1 });

  res.status(200).json(chats);
};

//Msg POST one
const msgPOSTone = async (req, res) => {
  const { content, user, userID, chatID } = req.body;

  try {
    const newMsg = await Msg.create({ content, user, userID, chatID });
    console.log(newMsg);
    res.status(200).json(newMsg);
  } catch (error) {
    console.log(
      `Something went wrong while posting a new chat to database ${response.status} ${response.statusText}`,
    );
  }
};

//Msg GET all from chat
const msgGETchat = async (req, res) => {
  console.log(req.params.chatID);

  const chatMsgs = await Msg.find({ chatID: req.params.chatID }).then(
    (data) => {
      return data;
    },
  );

  res.status(200).json(chatMsgs);
};
