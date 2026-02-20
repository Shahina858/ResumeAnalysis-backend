import User from "../models/User.js";
import jwt from "jsonwebtoken";

// For demo purposes, we'll use a simple JWT secret.
// In production, this should be in .env
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

/* ======================
   REGISTER USER
====================== */
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      username,
      email,
      password,
      isActive: true, // ✅ ensure active by default
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      message: "User registered successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ======================
   LOGIN USER
====================== */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // ✅ BLOCK DEACTIVATED USERS (CORRECT PLACE)
    if (!user.isActive) {
      return res
        .status(403)
        .json({ message: "Account deactivated by admin" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      message: "Login successful",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ======================
   GET ALL USERS (ADMIN)
====================== */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};