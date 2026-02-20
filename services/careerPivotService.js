export const predictCareerPath = (skills) => {
  if (skills.includes("React") && skills.includes("Leadership")) {
    return "Frontend Architect";
  }
  if (skills.includes("Node.js")) {
    return "Backend Engineer";
  }
  return "Software Engineer";
};
