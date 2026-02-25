import express from "express";
import { createEvent, updateEvent, deleteEvent } from "../controllers/event.controller.js";
// import authMiddleware from "../middleware/auth.middleware.js";
// import adminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

// Admin CRUD routes
router.post("/", /* authMiddleware, adminMiddleware, */ createEvent);
router.put("/:id", /* authMiddleware, adminMiddleware, */ updateEvent);
router.delete("/:id", /* authMiddleware, adminMiddleware, */ deleteEvent);

export default router;  