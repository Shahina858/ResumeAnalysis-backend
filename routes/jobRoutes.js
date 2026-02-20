import express from "express";
import auth from "../middlewares/authMiddleware.js";
import {
  generateJobsForResume,
  getMyJobs,
  applyToJob,
  cancelJobApplication,
} from "../controllers/jobController.js";

const router = express.Router();

router.post("/generate/:resumeId", auth, generateJobsForResume);
router.get("/my", auth, getMyJobs);
router.post("/apply/:jobId", auth, applyToJob);
router.post("/cancel/:jobId", auth, cancelJobApplication);
// router.post("/generate/:resumeId", auth, generateJobsForResume);

export default router;