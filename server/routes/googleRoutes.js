import {
  googlePOST,
  googleGET,
  googlePOSTuser,
  googleGETuser,
  googleGETall,
} from "../controllers/googleController.js";
import express from "express";

const router = express.Router();

//Google POST
router.post("/", googlePOST);

//Google POST User
router.post("/user", googlePOSTuser);

//Google GET all google users
router.get("/all", googleGETall);

//Google GET one google user
router.get("/", googleGET);

//Google GET user from MongoDB
router.get("/user/:email", googleGETuser);

export default router;
