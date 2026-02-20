const JOBS_DB = [
  {
    title: "React Developer",
    company: "ABC Tech",
    platform: "LinkedIn",
    requiredSkills: ["React", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "Frontend Engineer",
    company: "XYZ Solutions",
    platform: "Indeed",
    requiredSkills: ["React", "TypeScript", "CSS"],
  },
  {
    title: "UI Developer",
    company: "Startup Hub",
    platform: "Naukri",
    requiredSkills: ["HTML", "CSS", "Figma"],
  },
  {
    title: "MERN Stack Developer",
    company: "TechSoft",
    platform: "LinkedIn",
    requiredSkills: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    title: "Backend Developer",
    company: "CloudNine",
    platform: "Indeed",
    requiredSkills: ["Node.js", "MongoDB", "API"],
  },
];

export const recommendJobs = (userSkills = []) => {
  if (!userSkills.length) return [];

  return JOBS_DB
    .map((job) => {
      const matchedSkills = job.requiredSkills.filter((skill) =>
        userSkills.includes(skill)
      );

      return {
        ...job,
        matchScore: matchedSkills.length,
        matchedSkills,
      };
    })
    .filter((job) => job.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore);
};