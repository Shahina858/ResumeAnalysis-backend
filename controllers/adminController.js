import Resume from "../models/Resume.js";
import User from "../models/User.js";
import CareerPath from "../models/CareerPath.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

/* =========================
   ADMIN LOGIN
========================= */
export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  if (username?.toLowerCase() === "admin" && password === "admin") {
    const token = jwt.sign(
      { id: "admin-id", role: "admin" },
      JWT_SECRET,
      { expiresIn: "30d" }
    );

    return res.json({
      token,
      role: "admin",
      message: "Admin login successful",
    });
  }

  return res.status(401).json({ message: "Invalid admin credentials" });
};

/* =========================
   ADMIN DASHBOARD STATS
========================= */
export const adminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalResumes = await Resume.countDocuments();

    // ✅ AI-processed resumes
    const tailoredResumes = await Resume.countDocuments({
      aiAnalysis: { $exists: true, $ne: null },
    });

    const careerPaths = await CareerPath.countDocuments({
      approved: true,
    });

    res.json({
      totalUsers,
      totalResumes,
      tailoredResumes,
      careerPaths,
    });
  } catch (err) {
    console.error("ADMIN DASHBOARD ERROR", err);
    res.status(500).json({ message: "Failed to load dashboard data" });
  }
};

/* =========================
   SKILL HEATMAP ANALYTICS
========================= */
export const skillHeatmapAnalytics = async (req, res) => {
  try {
    const data = await Resume.aggregate([
      { $unwind: "$skills" },
      {
        $group: {
          _id: "$skills",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    res.json(
      data.map((item) => ({
        skill: item._id,
        count: item.count,
      }))
    );
  } catch (err) {
    console.error("SKILL HEATMAP ERROR", err);
    res.status(500).json({ message: "Failed to load skill analytics" });
  }
};
// import User from "../models/User.js";

export const toggleUserStatus = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.role === "admin") {
    return res.status(400).json({ message: "Cannot deactivate admin" });
  }

  user.isActive = !user.isActive;
  await user.save();

  res.json({
    message: user.isActive ? "User activated" : "User deactivated",
    user,
  });
};
