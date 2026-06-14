const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(
  "mongodb://barathkumar1321_db_user:Barath123@ac-0adotpy-shard-00-00.nptnhve.mongodb.net:27017,ac-0adotpy-shard-00-01.nptnhve.mongodb.net:27017,ac-0adotpy-shard-00-02.nptnhve.mongodb.net:27017/?ssl=true&replicaSet=atlas-kbkaix-shard-0&authSource=admin&appName=Cluster1"
)
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
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});