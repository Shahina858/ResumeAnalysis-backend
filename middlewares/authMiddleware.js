import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

/* =========================
   AUTH (User or Admin)
========================= */
export default function auth(req, res, next) {
  // ✅ Accept token from header OR query (for PDF downloads)
  const headerToken = req.headers.authorization;
  const queryToken = req.query.token;

  const token = headerToken
    ? headerToken.startsWith("Bearer ")
      ? headerToken.split(" ")[1]
      : headerToken
    : queryToken;

  console.log(
    `\n[${new Date().toLocaleTimeString()}] 🔐 AUTH CHECK 👉 ${req.method} ${req.url}`
  );
  console.log(
    "🔐 Token:",
    token ? token.slice(0, 15) + "..." : "MISSING"
  );

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded; // { id, role }
    console.log("✅ Auth OK:", decoded);
    next();
  } catch (err) {
    console.error("❌ Auth Error:", err.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

/* =========================
   ADMIN ONLY
========================= */
export const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    console.log("⛔ Access denied: Not admin");
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};