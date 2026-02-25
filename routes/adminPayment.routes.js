import express from "express";
import Order from "../models/Order.js";
// import authMiddleware from "../middleware/auth.middleware.js";
// import adminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

// GET all orders (admin view)
router.get("/", /* authMiddleware, adminMiddleware, */ async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;