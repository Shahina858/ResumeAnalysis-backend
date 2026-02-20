import { analyzeResume } from "../services/aiService.js";

export const analyze = async (req, res) => {
  try {
    const result = await analyzeResume(req.body.text);
    res.json(result);
  } catch (err) {
    res.status(504).json({ message: "AI analysis timeout" });
  }
};
