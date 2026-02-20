import Resume from "../models/Resume.js";
import Job from "../models/Job.js";
import { fetchAdzunaJobs } from "../services/adzunaJobService.js";

/* =========================
   GENERATE JOBS (PER RESUME)
========================= */
export const generateJobsForResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user.id;

    const resume = await Resume.findOne({
      _id: resumeId,
      user: userId,
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // 🔥 FETCH REAL JOBS FROM ADZUNA
    const jobs = await fetchAdzunaJobs({
      skills: resume.skills,
      location: resume.location || "india",
    });

    console.log("✅ Adzuna jobs fetched:", jobs.length);

    // ✅ IMPORTANT: Do NOT crash if no jobs found
    if (!jobs.length) {
      return res.json([]);
    }

    // ❗ Remove ONLY non-applied old jobs for this resume
    await Job.deleteMany({
      user: userId,
      resume: resumeId,
      applied: false,
    });

    const savedJobs = await Job.insertMany(
      jobs.map((job) => ({
        user: userId,
        resume: resumeId,
        title: job.title,
        company: job.company,
        platform: job.platform,
        location: job.location,
        description: job.description,
        applyUrl: job.applyUrl,
        skillsRequired: job.skillsRequired,
        matchedSkills: job.matchedSkills,
        matchScore: job.matchScore,
        applied: false,
      }))
    );

    res.json(savedJobs);
  } catch (err) {
    console.error("❌ JOB GENERATION ERROR:", err.message);
    res.status(500).json({ message: "Failed to generate jobs" });
  }
};

/* =========================
   GET MY JOBS
========================= */
export const getMyJobs = async (req, res) => {
  try {
    const userId = req.user.id;

    const jobs = await Job.find({ user: userId })
      .sort({ applied: 1, matchScore: -1, createdAt: -1 });

    res.json(jobs);
  } catch (err) {
    console.error("❌ FETCH JOBS ERROR:", err.message);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

/* =========================
   APPLY TO JOB
========================= */
export const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user.id;

    const job = await Job.findOneAndUpdate(
      { _id: jobId, user: userId },
      { applied: true },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (err) {
    console.error("❌ APPLY JOB ERROR:", err.message);
    res.status(500).json({ message: "Failed to apply job" });
  }
};

/* =========================
   CANCEL JOB APPLICATION
========================= */
export const cancelJobApplication = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user.id;

    const job = await Job.findOneAndUpdate(
      { _id: jobId, user: userId },
      { applied: false },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (err) {
    console.error("❌ CANCEL JOB ERROR:", err.message);
    res.status(500).json({ message: "Failed to cancel application" });
  }
};