import mongoose from "mongoose";

const tailoredResumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    baseResume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    jobTitle: String,
    company: String,
    jobDescription: String,

    tailoredText: {
      type: String,
      required: true,
    },

    atsScore: Number,
  },
  { timestamps: true }
);

export default mongoose.model("TailoredResume", tailoredResumeSchema);