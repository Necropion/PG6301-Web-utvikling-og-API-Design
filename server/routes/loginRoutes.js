import express from "express";
import {
  loginPOST,
  loginGET,
  loginDELETE,
} from "../controllers/loginController.js";

const router = express.Router();

//Login POST
router.post("/", loginPOST);

//Login GET
router.get("/", loginGET);

//Login DELETE
router.delete("/", loginDELETE);

export default router;
