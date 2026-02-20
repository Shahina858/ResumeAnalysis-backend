import { calculateSkillGap } from "../services/skillGapService.js";

export const getSkillGap = (req, res) => {
  const { skills, role } = req.body;
  const result = calculateSkillGap(skills, role);
  res.json(result);
};
