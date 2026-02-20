import express from "express";
import {
  adminDashboard,
  loginAdmin,
  skillHeatmapAnalytics,
} from "../controllers/adminController.js";
import { getAllUsers } from "../controllers/userController.js";
import { getAllResumes } from "../controllers/resumeController.js";
import auth, { isAdmin } from "../middlewares/authMiddleware.js";
import { toggleUserStatus } from "../controllers/adminController.js";
const router = express.Router();

/* PUBLIC */
router.post("/login", loginAdmin);

/* ADMIN ONLY */
router.get("/dashboard", auth, isAdmin, adminDashboard);
router.get("/users", auth, isAdmin, getAllUsers);
router.get("/analytics/skills", auth, isAdmin, skillHeatmapAnalytics);

/* 🔥 ADMIN RESUME REVIEW */
router.get("/resumes", auth, isAdmin, getAllResumes);


router.patch(
  "/users/:userId/toggle",
  auth,
  isAdmin,
  toggleUserStatus
);

export default router;