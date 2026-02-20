import { autoApply } from "../services/autoApplyService.js";

export const runAutoApplyJob = async (jobId) => {
  const result = autoApply(jobId);
  console.log(result);
};
