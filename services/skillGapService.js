const roleSkills = {
  "Frontend Developer": ["React", "TypeScript", "CSS", "Git"],
};

const courses = {
  TypeScript: "Udemy TypeScript Bootcamp",
  Git: "Coursera Git Essentials",
};

export const calculateSkillGap = (userSkills, role) => {
  const required = roleSkills[role] || [];
  const missingSkills = required.filter(
    skill => !userSkills.includes(skill)
  );

  return {
    missingSkills,
    courses: missingSkills.map(skill => ({
      skill,
      course: courses[skill],
    })),
  };
};
