import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  reference: { type: String, unique: true },
  eventId: String,
  email: String,
  ticketType: String,
  quantity: Number,
  amount: Number,
  status: { type: String, default: "pending" }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);