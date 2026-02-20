import Resume from "../models/Resume.js";
import parseResume from "../utils/resumeParser.js";
import { analyzeResume } from "../services/aiService.js";
import fs from "fs";

export const uploadResume = async (req, res) => {
  try {
    console.log("FILE UPLOAD ATTEMPT 👉", req.file);

    if (!req.file) {
      console.log("❌ No file provided in request");
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("⏳ Parsing resume...");
    const text = await parseResume(req.file.buffer);

    console.log("✅ Parsing successful");

    console.log("⏳ Analyzing resume...");
    const analysis = await analyzeResume(text);
    console.log("✅ Analysis successful");

    console.log("⏳ Saving to database...");
    const resume = await Resume.create({
      user: req.user?.id, // 👈 AUTHENTICATED USER
      text,
      skills: analysis.skills || [],
      experience: analysis.experience || "",
      education: analysis.education || "",
      location: analysis.location || "",
      aiAnalysis: analysis,
    });
    console.log("✅ Saved to database:", resume._id);

    res.status(201).json(resume);
  } catch (err) {
    console.error("UPLOAD ERROR ❌", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ ADD THIS FUNCTION
export const getAllResumes = async (req, res) => {
  try {
    let query = {};
    // If not admin, only show own resumes
    if (req.user?.role !== "admin") {
      query.user = req.user.id;
    }

    const resumes = await Resume.find(query)
      .populate("user", "username email")
      .sort({ createdAt: -1 });
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getResumeById = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await Resume.findById(id)
      .populate("user", "username email role");

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // 🔐 Security check:
    // Allow admin OR owner of resume
    if (
      req.user.role !== "admin" &&
      resume.user?._id.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(resume);
  } catch (err) {
    console.error("GET RESUME BY ID FAILED ❌", err);
    res.status(500).json({ message: err.message });
  }
};