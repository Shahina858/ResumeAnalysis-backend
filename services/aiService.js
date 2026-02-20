export const analyzeResume = async (text) => {
  const lowercaseText = text.toLowerCase();

  // Basic skill extraction logic
  const possibleSkills = [
    "React", "Node.js", "JavaScript", "TypeScript", "Python", "Java",
    "AWS", "Docker", "Kubernetes", "SQL", "NoSQL", "MongoDB",
    "Express", "Redux", "GraphQL", "Leadership", "Project Management",
    "Agile", "Scrum", "Next.js", "Tailwind CSS", "CSS", "HTML"
  ];

  const skills = possibleSkills.filter(skill =>
    lowercaseText.includes(skill.toLowerCase())
  );

  // Generate dynamic ATS score based on common keywords count
  const ats_score = Math.min(60 + (skills.length * 3), 98);

  const missing_keywords = possibleSkills
    .filter(skill => !skills.includes(skill))
    .slice(0, 5);

  return {
    summary: skills.length > 0 ? `Experienced professional with skills in ${skills.slice(0, 3).join(", ")}.` : "Resume processed.",
    skills,
    strengths: skills.slice(0, 5),
    weaknesses: missing_keywords.slice(0, 2),
    missing_keywords: missing_keywords,
    ats_score,
    improvement_suggestions: [
      "Ensure all key technical skills are highlighted in a separate section.",
      "Use quantitative metrics to describe your achievements.",
      "Optimize for ATS by using standard job titles and headings."
    ]
  };
};

export const tailorResumeForJob = async (resumeText, jobDescription) => {
  // 🔥 Simulated AI logic (replace with OpenAI later)
  return {
    tailoredText: `
TAILORED RESUME

Optimized for Job Description:
${jobDescription}

--------------------------------

${resumeText}

--------------------------------
Keywords aligned with job role.
`,
    atsScore: Math.floor(Math.random() * 15) + 80,
  };
};