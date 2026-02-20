export const tailorResume = (resumeText, jobDescription) => {
  return `
${resumeText}

--- Tailored For Job ---
${jobDescription}

Optimized keywords added for ATS
`;
};
