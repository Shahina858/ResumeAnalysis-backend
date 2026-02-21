import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";

import connectDB from "./config/db.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import skillGapRoutes from "./routes/skillGapRoutes.js";
import careerRoutes from "./routes/careerRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import voiceRoutes from "./routes/voiceRoutes.js";
import tailoredResumeRoutes from "./routes/tailoredResumeRoutes.js";
import errorHandler from "./middlewares/errorMiddleware.js";

import { initSocket } from "./socket.js";

dotenv.config();
connectDB();

const app = express();

/* ================= MIDDLEWARE ================= */
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true, // 🔥 REQUIRED
//   })
// );
app.use(
  cors({
    origin: "https://your-site-name.netlify.app", // 👈 VERCEL LINK HERE
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* ================= HEALTH ================= */
app.get("/api/health", (req, res) =>
  res.json({
    status: "ok",
    version: "1.0.5",
    time: new Date().toISOString(),
  })
);

/* ================= SOCKET SERVER ================= */
const server = http.createServer(app);
const io = initSocket(server);

/* 🔥 MAKE SOCKET AVAILABLE EVERYWHERE */
app.use((req, res, next) => {
  req.io = io;
  next();
});

/* ================= ROUTES ================= */
app.use("/api/resume", resumeRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/skill-gap", skillGapRoutes);
app.use("/api/career", careerRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/voice", voiceRoutes);
app.use("/api/tailored-resume", tailoredResumeRoutes);

/* ================= ERROR HANDLER ================= */
app.use(errorHandler);

/* ================= START ================= */
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server + Socket.IO running on http://localhost:${PORT}`);
});