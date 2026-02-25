import express from "express";
import { signup, login } from "../controllers/auth.controller.js";
import { adminLogin } from "../controllers/adminAuth.controller.js";
const router = express.Router();

//User
router.post("/signup", signup);
router.post("/login", login);

// Admin Login Route
router.post("/login", adminLogin);

export default router;