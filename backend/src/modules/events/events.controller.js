const { asyncHandler } = require('../../utils/asyncHandler');
const { successResponse } = require('../../utils/apiResponse');
const eventsService = require('./events.service');

const listEvents = asyncHandler(async (req, res) => {
  const events = await eventsService.listEvents();
  return successResponse(res, events, 'Events fetched successfully');
});

const createEvent = asyncHandler(async (req, res) => {
  const event = await eventsService.createEvent(req.body);
  return successResponse(res, event, 'Event created successfully', 201);
});

const getEvent = asyncHandler(async (req, res) => {
  const event = await eventsService.getEventById(req.params.id);
  return successResponse(res, event, 'Event fetched successfully');
});

const updateEvent = asyncHandler(async (req, res) => {
  const event = await eventsService.updateEvent(req.params.id, req.body);
  return successResponse(res, event, 'Event updated successfully');
});

const deleteEvent = asyncHandler(async (req, res) => {
  const event = await eventsService.deleteEvent(req.params.id);
  return successResponse(res, event, 'Event deleted successfully');
});

module.exports = {
  listEvents,
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
};
