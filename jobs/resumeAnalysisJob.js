import { analyzeResume } from "../services/aiService.js";
import Resume from "../models/Resume.js";

export const runResumeAnalysisJob = async (resumeId) => {
  const resume = await Resume.findById(resumeId);
  if (!resume) return;

  const analysis = await analyzeResume(resume.text);

  resume.aiAnalysis = analysis;
  resume.skills = analysis.skills || [];
  resume.experience = analysis.experience || "";
  resume.education = analysis.education || "";
  resume.location = analysis.location || "";

  await resume.save();

  console.log("✅ Resume analysis completed:", resumeId);
};