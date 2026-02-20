import Resume from "../models/Resume.js";
import TailoredResume from "../models/TailoredResume.js";
import { tailorResumeForJob } from "../services/aiService.js";
import PDFDocument from "pdfkit";

export const generateTailoredResume = async (req, res) => {
  try {
    const { resumeId, jobTitle, company, jobDescription } = req.body;

    const resume = await Resume.findOne({
      _id: resumeId,
      user: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const aiResult = await tailorResumeForJob(
      resume.text,
      jobDescription
    );

    const tailored = await TailoredResume.create({
      user: req.user.id,
      baseResume: resumeId,
      jobTitle,
      company,
      jobDescription,
      tailoredText: aiResult.tailoredText,
      atsScore: aiResult.atsScore,
    });

    res.json(tailored);
  } catch (err) {
    console.error("TAILORING FAILED ❌", err);
    res.status(500).json({ message: err.message });
  }
};
/* =========================
   GET MY TAILORED RESUMES
========================= */
export const getMyTailoredResumes = async (req, res) => {
  const resumes = await TailoredResume.find({ user: req.user.id })
    .sort({ createdAt: -1 });

  res.json(resumes);
};

/* =========================
   GET SINGLE TAILORED RESUME
========================= */
export const getTailoredResumeById = async (req, res) => {
  const resume = await TailoredResume.findOne({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!resume) {
    return res.status(404).json({ message: "Tailored resume not found" });
  }

  res.json(resume);
};


export const downloadTailoredResumePDF = async (req, res) => {
  try {
    const resume = await TailoredResume.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=tailored-resume-${resume._id}.pdf`
    );

    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(res);

    // 🧠 PDF CONTENT
    doc.fontSize(20).text("Tailored Resume", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Job Title: ${resume.jobTitle}`);
    doc.text(`Company: ${resume.company}`);
    doc.moveDown();

    doc.fontSize(12).text(resume.tailoredText, {
      align: "left",
    });

    doc.end();
  } catch (err) {
    console.error("PDF ERROR ❌", err);
    res.status(500).json({ message: "Failed to generate PDF" });
  }
};