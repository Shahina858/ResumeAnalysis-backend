import mongoose from "mongoose";

const careerPathSchema = new mongoose.Schema(
  {
    fromRole: String,
    toRole: String,
    requiredSkills: [String],
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("CareerPath", careerPathSchema);
