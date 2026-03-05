const express = require('express');

const {
  listNotices,
  createNotice,
  getNotice,
  updateNotice,
  deleteNotice,
} = require('./notice-board.controller');
const {
  validateCreateNoticePayload,
  validateUpdateNoticePayload,
} = require('./notice-board.validation');

const router = express.Router();

router
  .route('/')
  .get(listNotices)
  .post((req, res, next) => {
    try {
      validateCreateNoticePayload(req.body);
    } catch (err) {
      return next(err);
    }
    return createNotice(req, res, next);
  });

router
  .route('/:id')
  .get(getNotice)
  .patch((req, res, next) => {
    try {
      validateUpdateNoticePayload(req.body);
    } catch (err) {
      return next(err);
    }
    return updateNotice(req, res, next);
  })
  .delete(deleteNotice);

module.exports = router;
