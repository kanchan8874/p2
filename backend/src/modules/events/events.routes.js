const express = require('express');

const {
  listEvents,
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
} = require('./events.controller');
const {
  validateCreateEventPayload,
  validateUpdateEventPayload,
} = require('./events.validation');

const router = express.Router();

router
  .route('/')
  .get(listEvents)
  .post((req, res, next) => {
    try {
      validateCreateEventPayload(req.body);
    } catch (err) {
      return next(err);
    }
    return createEvent(req, res, next);
  });

router
  .route('/:id')
  .get(getEvent)
  .patch((req, res, next) => {
    try {
      validateUpdateEventPayload(req.body);
    } catch (err) {
      return next(err);
    }
    return updateEvent(req, res, next);
  })
  .delete(deleteEvent);

module.exports = router;
