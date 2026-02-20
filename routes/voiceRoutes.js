import express from "express";
import auth from "../middlewares/authMiddleware.js";
import upload from "../middlewares/voiceUpload.js";
import { sendVoice, getConversation } from "../controllers/voiceController.js";

const router = express.Router();

router.post("/", auth, upload.single("voice"), sendVoice);
router.get("/:userId", auth, getConversation);

export default router;