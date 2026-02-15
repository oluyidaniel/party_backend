import Event from "../models/Event.js";

/* ADMIN */
export const createEvent = async (req, res) => {
  try {
    // Generate a unique eventId
    const eventId = new Date().getTime().toString() + Math.floor(Math.random() * 10000);

    // Map frontend fields into proper schema structure
    const eventData = {
      eventId,
      card: {
        title: req.body.title || "",
        location: req.body.location || "",
        date: req.body.date || "",
        time: req.body.time || "",
        image: req.body.heroImage || ""
      },
      peopleGoing: 0,
      details: {
        description: req.body.description || "",
        tickets: req.body.tickets || []
      },
      prices: req.body.prices || []
    };

    // Create event in MongoDB
    const event = await Event.create(eventData);

    res.status(201).json({ success: true, event });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  const event = await Event.findOneAndUpdate(
    { eventId: req.params.id },
    req.body,
    { new: true }
  );
  if (!event) return res.status(404).json({ message: "Event not found" });
  res.json({ success: true, event });
};

export const deleteEvent = async (req, res) => {
  const event = await Event.findOneAndDelete({ eventId: req.params.id });
  if (!event) return res.status(404).json({ message: "Event not found" });
  res.json({ success: true, message: "Event deleted" });
};

/* USER */
export const getEvents = async (req, res) => {
  const events = await Event.find().sort({ createdAt: -1 });
  res.json({ success: true, events });
};

export const getEventById = async (req, res) => {
  const event = await Event.findOne({ eventId: req.params.id });
  if (!event) return res.status(404).json({ message: "Event not found" });
  res.json({ success: true, event });
};