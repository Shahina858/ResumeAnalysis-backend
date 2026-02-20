import CareerPath from "../models/CareerPath.js";

/* =========================
   CREATE CAREER PIVOT (ADMIN)
========================= */
export const createCareerPivot = async (req, res) => {
  try {
    const { fromRole, toRole, requiredSkills } = req.body;

    const pivot = await CareerPath.create({
      fromRole,
      toRole,
      requiredSkills,
      approved: false, // admin approval flow
    });

    res.status(201).json(pivot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   GET ALL CAREER PIVOTS
========================= */
export const getCareerPivots = async (req, res) => {
  const pivots = await CareerPath.find().sort({ createdAt: -1 });
  res.json(pivots);
};

/* =========================
   APPROVE CAREER PIVOT (ADMIN)
========================= */
export const approveCareerPivot = async (req, res) => {
  const { id } = req.params;

  const pivot = await CareerPath.findByIdAndUpdate(
    id,
    { approved: true },
    { new: true }
  );

  if (!pivot) {
    return res.status(404).json({ message: "Career path not found" });
  }

  res.json(pivot);
};