import mongoose from "mongoose";

const priceSchema = new mongoose.Schema({
  type: String,
  amount: Number,
  currency: String
});

const eventSchema = new mongoose.Schema({
  eventId: { type: String, unique: true },

  card: {
    title: String,
    location: String,
    date: String,
    time: String,
    image: String,
    peopleGoing: { type: Number, default: 0 }
  },

  details: {
    bannerImage: String,
    description: String,
    venue: String,
    prices: [priceSchema],
    cta: { label: String, action: String }
  }

}, { timestamps: true });

export default mongoose.model("Event", eventSchema);