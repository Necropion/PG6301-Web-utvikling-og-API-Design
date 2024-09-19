import express from "express";
import {
  chatGETall,
  chatPOSTone,
  chatGETone,
  chatGETUser,
  chatGETavailibility,
  chatUPDATEone,
  chatDELETEone,
} from "../controllers/chatController.js";

const router = express.Router();

//Chat GET all chats
router.get("/", chatGETall);

//Chat POST one
router.post("/", chatPOSTone);

//Chat GET one
router.get("/:id", chatGETone);

//Chat GET one by title
router.get("/availibility/:title", chatGETavailibility);

//Chat GET all from one user
router.get("/user/:userID", chatGETUser);

//Chat UPDATE for one chat
router.put("/:id", chatUPDATEone);

//Chat DELETE one
router.delete("/:id", chatDELETEone);

export default router;
