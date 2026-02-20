import mongoose from "mongoose";

const voiceMessageSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    audioUrl: {
      type: String,
      required: true,
    },
    role: {
      type: String, // "user" | "admin"
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("VoiceMessage", voiceMessageSchema);