import express from "express";
import auth from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/authMiddleware.js";
import {
  createCareerPivot,
  getCareerPivots,
  approveCareerPivot,
} from "../controllers/careerPivotController.js";

const router = express.Router();

/* ADMIN ONLY */
router.post("/pivot", auth, isAdmin, createCareerPivot);
router.get("/pivot", auth, isAdmin, getCareerPivots);
router.patch("/pivot/:id/approve", auth, isAdmin, approveCareerPivot);

export default router;