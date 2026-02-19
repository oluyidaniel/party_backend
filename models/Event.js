import mongoose from "mongoose";

// Ticket / Price schema
const priceSchema = new mongoose.Schema({
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: "NGN" },
  benefits: String
});

// Main Event schema
const eventSchema = new mongoose.Schema({
  eventId: { type: String, unique: true },

  card: {
    title: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    image: { type: String, required: true },
    peopleGoing: { type: Number, default: 0 }
  },

  details: {
    bannerImage: { type: String, required: true },
    description: { type: String, required: true },
    venue: { type: String, required: true },
    prices: [priceSchema],
    cta: { label: String, action: String }
  }

}, { timestamps: true });

export default mongoose.model("Event", eventSchema);