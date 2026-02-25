import express from "express";
import { getEvents, getEventById } from "../controllers/event.controller.js";

const router = express.Router();

// User routes
router.get("/", getEvents);
router.get("/:id", getEventById);

export default router;