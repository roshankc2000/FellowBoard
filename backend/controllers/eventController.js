import Event from '../models/event.js';

export const createEvent = async (req, res) => {
  try {
    const { name, description, event_type, date, time, location, meeting_link } = req.body;
    const fellowship_id = req.user.fellowship_id;

    // Check if the user is a organizer of the fellowship
    if (req.user.role != 'organizer') {
        return res.status(403).json({ message: 'Only organizers can create events' });
    }
    
    console.log(req.user);

    const event = await Event.create({
      name,
      description,
      event_type,
      date,
      time,
      location,
      fellowship_id,
      meeting_link,
    });

    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating event', error: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const fellowship_id = req.user.fellowship_id; 

    // Fetch events related to the fellowship ID
    const events = await Event.findAll({
      where: { fellowship_id }
    });

    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
};

export const getEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const fellowship_id = req.user.fellowship_id;

    const event = await Event.findOne({
      where: { id: eventId, fellowship_id }
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching event', error: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { name, description, event_type, date, time, location, meeting_link } = req.body;
    const fellowship_id = req.user.fellowship_id; 

    if (req.user.role != 'organizer') {
        return res.status(403).json({ message: 'Only organizers can edit events' });
    }
    

    const event = await Event.findOne({
      where: { id: eventId, fellowship_id }
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    event.name = name || event.name;
    event.description = description || event.description;
    event.event_type = event_type || event.event_type;
    event.date = date || event.date;
    event.time = time || event.time;
    event.location = location || event.location;
    event.meeting_link = meeting_link || event.meeting_link;

    await event.save();

    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating event', error: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const fellowship_id = req.user.fellowship_id;  

    if (req.user.role != 'organizer') {
        return res.status(403).json({ message: 'Only organizers can delete events' });
    }
    

    const event = await Event.findOne({
      where: { id: eventId, fellowship_id }
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await event.destroy();  // Delete the event

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting event', error: error.message });
  }
};
