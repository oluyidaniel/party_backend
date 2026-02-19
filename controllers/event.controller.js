import Event from "../models/Event.js";

// Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json({ success: true, events });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findOne({ eventId: req.params.id });
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ success: true, event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create event
export const createEvent = async (req, res) => {
  try {
    const eventId = Date.now().toString() + Math.floor(Math.random() * 10000);
    const newEvent = {
      eventId,
      card: req.body.card,
      details: req.body.details
    };
    const event = await Event.create(newEvent);
    res.status(201).json({ success: true, event });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// Update event
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndUpdate({ eventId: req.params.id }, req.body, { new: true });
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ success: true, event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({ eventId: req.params.id });
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ success: true, message: "Event deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};