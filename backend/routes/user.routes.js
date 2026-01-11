import express from "express";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";

import {
  getCurrentUser,
  updateAssistant,
  askToAssistant,
} from "../controllers/user.controllers.js";

const router = express.Router();

// ================= GET CURRENT USER =================
router.get("/me", isAuth, getCurrentUser);

// ================= UPDATE ASSISTANT =================
router.post(
  "/assistant",
  isAuth,
  upload.single("image"),
  updateAssistant
);

// ================= ASK ASSISTANT =================
router.post("/ask", isAuth, askToAssistant);

export default router;
