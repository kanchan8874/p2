const express = require('express');

const {
  listThreads,
  createThread,
  listMessagesForThread,
  createMessage,
  listNotifications,
  markNotificationRead,
} = require('./communication.controller');
const {
  validateCreateThreadPayload,
  validateCreateMessagePayload,
} = require('./communication.validation');
const { authMiddleware } = require('../../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

// Threads
router
  .route('/threads')
  .get(listThreads)
  .post((req, res, next) => {
    try {
      validateCreateThreadPayload(req.body);
    } catch (err) {
      return next(err);
    }
    return createThread(req, res, next);
  });

// Messages
router
  .route('/threads/:threadId/messages')
  .get(listMessagesForThread)
  .post((req, res, next) => {
    try {
      validateCreateMessagePayload(req.body);
    } catch (err) {
      return next(err);
    }
    return createMessage(req, res, next);
  });

// Notifications
router.route('/notifications').get(listNotifications);
router.route('/notifications/:id/read').patch(markNotificationRead);

module.exports = router;
