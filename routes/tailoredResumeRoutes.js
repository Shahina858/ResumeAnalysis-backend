import express from "express";
import auth from "../middlewares/authMiddleware.js";
import { generateTailoredResume ,getMyTailoredResumes,getTailoredResumeById,downloadTailoredResumePDF} from "../controllers/tailoredResumeController.js";

const router = express.Router();

router.post("/generate", auth, generateTailoredResume);
router.get("/", auth, getMyTailoredResumes);       // ✅ list
router.get("/:id", auth, getTailoredResumeById);   // ✅ single
router.get("/:id/pdf", auth, downloadTailoredResumePDF);

export default router;