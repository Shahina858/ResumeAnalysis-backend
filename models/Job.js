import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    /* 🔑 OWNERSHIP */
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },

    /* JOB INFO */
    title: {
      type: String,
      required: true,
    },
    company: String,
    platform: String,
    location: String,

    description: String,
    applyUrl: String,

    /* MATCHING */
    skillsRequired: [String],
    matchedSkills: [String],
    matchScore: {
      type: Number,
      default: 0,
    },

    /* USER STATE */
    applied: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);