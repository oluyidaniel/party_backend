import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import eventRoutes from "./routes/event.routes.js";
import adminEventRoutes from "./routes/admin.event.routes.js";
import userEventRoutes from "./routes/user.event.routes.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ----------------------------
// Test MongoDB connection
// ----------------------------
app.get("/test-db", async (req, res) => {
  try {
    res.json({ message: "Server running and MongoDB connected!" });
  } catch (err) {
    res.status(500).json({ message: "MongoDB connection failed", error: err.message });
  }
});

// ----------------------------
// Routes
// ----------------------------
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/admin/events", adminEventRoutes);
app.use("/api/user/events", userEventRoutes);

// ----------------------------
// Start server
// ----------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));