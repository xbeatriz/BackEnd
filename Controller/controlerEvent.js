const { Event } = require('../models/models.js'); // Import your Event model

exports.getAllEvents =  async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
},

// Get a specific event by ID
exports.getEventById = async (req, res) => {
  const eventId = req.params.id;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
},

// Create a new event
exports.createEvent = async (req, res) => {
  const { name, date, hour, local, description, ageLimit } = req.body;
  const event = new Event({ name, date, hour, local, description, ageLimit });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
},

// Update an event by ID
exports.updateEvent = async (req, res) => {
  const eventId = req.params.id;
  const updates = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(eventId, updates, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
},

// Delete an event by ID
exports.deleteEvent = async (req, res) => {
  const eventId = req.params.id;

  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}