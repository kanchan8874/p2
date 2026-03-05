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
const { authMiddleware, requireRoles } = require('../../middlewares/auth.middleware');
const { Roles } = require('../../constants/roles');

const router = express.Router();

router
  .route('/')
  .get(listEvents) // public list
  .post(authMiddleware, (req, res, next) => {
    try {
      validateCreateEventPayload(req.body);
    } catch (err) {
      return next(err);
    }
    return requireRoles(Roles.ADMIN, Roles.TEACHER)(req, res, () => createEvent(req, res, next));
  });

router
  .route('/:id')
  .get(getEvent)
  .patch(authMiddleware, (req, res, next) => {
    try {
      validateUpdateEventPayload(req.body);
    } catch (err) {
      return next(err);
    }
    return requireRoles(Roles.ADMIN, Roles.TEACHER)(req, res, () => updateEvent(req, res, next));
  })
  .delete(authMiddleware, (req, res, next) =>
    requireRoles(Roles.ADMIN, Roles.TEACHER)(req, res, () => deleteEvent(req, res, next)),
  );

module.exports = router;
