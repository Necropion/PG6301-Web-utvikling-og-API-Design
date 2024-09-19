import express from "express";
import {
  msgGETall,
  msgPOSTone,
  msgGETchat,
} from "../controllers/msgController.js";

const router = express.Router();

//Msg GET All
router.get("/", msgGETall);

//Msg GET all from chat
router.get("/chat/:chatID", msgGETchat);

//Msg POST One
router.post("/", msgPOSTone);

export default router;
