const Event = require('./events.model');

const listEvents = async () => Event.find().exec();

const createEvent = async (payload) => {
  const event = await Event.create(payload);
  return event;
};

const getEventById = async (id) => {
  const event = await Event.findById(id).exec();
  if (!event) {
    const error = new Error('Event not found');
    error.statusCode = 404;
    throw error;
  }
  return event;
};

const updateEvent = async (id, payload) => {
  const event = await Event.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).exec();
  if (!event) {
    const error = new Error('Event not found');
    error.statusCode = 404;
    throw error;
  }
  return event;
};

const deleteEvent = async (id) => {
  const event = await Event.findByIdAndDelete(id).exec();
  if (!event) {
    const error = new Error('Event not found');
    error.statusCode = 404;
    throw error;
  }
  return event;
};

module.exports = {
  listEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
};
