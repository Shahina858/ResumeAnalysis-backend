import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false
    },
    text: { type: String, required: true },
    skills: [String],
    experience: String,
    education: String,
    location: String,
    aiAnalysis: Object,
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);
