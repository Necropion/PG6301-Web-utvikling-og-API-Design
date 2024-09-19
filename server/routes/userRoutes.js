import express from "express";
import {
  userPOST,
  userGETvalidate,
  userGETall,
} from "../controllers/userController.js";

const router = express.Router();

//User POST
router.post("/", userPOST);

//User GET validate user
router.get("/validate/:username&:password", userGETvalidate);

//User GET all users
router.get("/", userGETall);

export default router;
