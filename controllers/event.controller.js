import Event from "../models/Event.js";

/* ADMIN */
export const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json({ success: true, event });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  const event = await Event.findOneAndUpdate({ eventId: req.params.id }, req.body, { new: true });
  res.json(event);
};

export const deleteEvent = async (req, res) => {
  await Event.findOneAndDelete({ eventId: req.params.id });
  res.json({ message: "Event deleted" });
};

/* USER */
export const getEvents = async (req, res) => {
  const events = await Event.find().sort({ createdAt: -1 });
  res.json(events);
};

export const getEventById = async (req, res) => {
  const event = await Event.findOne({ eventId: req.params.id });
  if (!event) return res.status(404).json({ message: "Event not found" });
  res.json(event);
};