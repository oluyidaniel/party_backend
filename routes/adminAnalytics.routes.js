import express from "express";
import { getAdminAnalytics } from "../controllers/adminAnalytics.controller.js";
// import authMiddleware from "../middleware/auth.middleware.js";
// import adminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

// GET /api/admin/analytics
router.get("/", /* authMiddleware, adminMiddleware, */ getAdminAnalytics);

export default router;