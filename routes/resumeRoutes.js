import express from "express";
import {
  uploadResume,
  getAllResumes,
  getResumeById, // ✅ ADD
} from "../controllers/resumeController.js";
import upload from "../middlewares/uploadMiddleware.js";
import auth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/upload",
  auth, // 👈 PROTECTED
  upload.single("resume"),
  uploadResume
);
router.get("/", auth, getAllResumes); // 👈 PROTECTED
router.post(
  "/upload",
  auth,
  upload.single("resume"),
  uploadResume
);

router.get("/", auth, getAllResumes);

// ✅ NEW ROUTE (IMPORTANT)
router.get("/:id", auth, getResumeById);

export default router;
