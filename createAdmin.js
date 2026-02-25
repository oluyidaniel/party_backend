import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await User.findOne({ email: "admin@example.com" });
    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 12);

    const admin = await User.create({
      firstName: "Super",
      lastName: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created:", admin.email);
    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();