import Event from "../models/Event.js";

/* ADMIN */
export const createEvent = async (req, res) => {
  try {
    // Generate a unique eventId
    const eventId = new Date().getTime().toString() + Math.floor(Math.random() * 10000);

    // Map frontend fields into proper schema structure
    const newEvent = {
      eventId,

      card: {
        title: req.body.card?.title || "",
        location: req.body.card?.location || "",
        date: req.body.card?.date || "",
        time: req.body.card?.time || "",
        image: req.body.card?.image || "",
        peopleGoing: req.body.card?.peopleGoing || 0
      },
      details: {
        bannerImage: req.body.details?.bannerImage || "",
        description: req.body.details?.description || "",
        venue: req.body.details?.venue || "",
        prices: req.body.details?.prices || [],
        cta: req.body.details?.cta || {}
      }
    };

    // Create event in MongoDB
    const event = await Event.create(newEvent);

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