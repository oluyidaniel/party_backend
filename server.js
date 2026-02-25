import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import eventRoutes from "./routes/event.routes.js";
import adminEventRoutes from "./routes/admin.event.routes.js";
import userEventRoutes from "./routes/user.event.routes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import adminAuthRoutes from "./routes/adminAuth.routes.js";
import adminPaymentRoutes from "./routes/adminPayment.routes.js";
import adminAnalyticsRoutes from "./routes/adminAnalytics.routes.js";

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
// Increase limit to 10MB (adjust as needed)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// ----------------------------
// Routes
// ----------------------------
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/admin/events", adminEventRoutes);
app.use("/api/user/events", userEventRoutes);

// Admin view of payments
app.use("/api/admin/payments", adminPaymentRoutes);
// Admin analytics
app.use("/api/admin/analytics", adminAnalyticsRoutes);

app.use("/api/payments", paymentRoutes);
// Admin Login Route
app.use("/api/admin", adminAuthRoutes);  
     // for login
// ----------------------------
// Start server
// ----------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));