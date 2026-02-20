import express from "express";
import { getSkillGap } from "../controllers/skillGapController.js";

const router = express.Router();

router.post("/", getSkillGap);

export default router;
