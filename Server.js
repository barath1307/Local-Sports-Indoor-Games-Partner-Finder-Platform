const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log("✅ MongoDB connected");
})
.catch((err) => {
  console.log("❌ MongoDB error:", err);
});

// Auth Routes
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the backend!");
});

// Test Route
app.get("/test", (req, res) => {
  res.send("Backend is running!");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});