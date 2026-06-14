const express = require("express");
const router = express.Router();
console.log("AUTH ROUTES LOADED");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

// Register Route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      "secretKey",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});
router.get("/hello", (req, res) => {
  res.send("Hello Route Working");
});
// Protected Route
router.get("/profile", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "No token provided"
    });
  }

  try {
    const decoded = jwt.verify(token, "secretKey");

    res.json({
      message: "Profile access granted",
      userId: decoded.id
    });
  } catch (err) {
    res.status(401).json({
      message: "Invalid token"
    });
  }
});

module.exports = router;