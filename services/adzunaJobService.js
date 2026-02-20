import axios from "axios";

const APP_ID = process.env.ADZUNA_APP_ID;
const APP_KEY = process.env.ADZUNA_APP_KEY;

export const fetchAdzunaJobs = async ({ skills = [] }) => {
  if (!skills.length) return [];

  // 🔥 Stronger keyword (this matters a LOT)
  const keyword = `${skills.slice(0, 2).join(" ")} developer`;

  try {
    const res = await axios.get(
      "https://api.adzuna.com/v1/api/jobs/in/search/1",
      {
        params: {
          app_id: APP_ID,
          app_key: APP_KEY,
          what: keyword,
          results_per_page: 20,
          content_type: "application/json",
        },
      }
    );

    const results = res?.data?.results;
    if (!Array.isArray(results)) {
      console.warn("⚠️ Adzuna returned no results");
      return [];
    }

    return results
      .map((job) => {
        const applyUrl =
          job.redirect_url ||
          job.url ||
          null;

        if (!applyUrl) return null; // ❗ Drop jobs without apply link

        return {
          title: job.title,
          company: job.company?.display_name || "Unknown",
          platform: applyUrl.includes("linkedin")
            ? "LinkedIn"
            : applyUrl.includes("indeed")
            ? "Indeed"
            : "Company / Recruiter",
          location: job.location?.display_name,
          description: job.description,
          applyUrl,
          skillsRequired: skills,
          matchedSkills: skills.slice(0, 2),
          matchScore: skills.slice(0, 2).length,
        };
      })
      .filter(Boolean); // ❗ remove null jobs
  } catch (err) {
    console.error("❌ ADZUNA ERROR:", err.message);
    return [];
  }
};