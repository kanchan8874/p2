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
const { authMiddleware, requireRoles } = require('../../middlewares/auth.middleware');
const { Roles } = require('../../constants/roles');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notices
 *   description: Notice board
 */

/**
 * @swagger
 * /notices:
 *   get:
 *     summary: List notices
 *     tags: [Notices]
 *     responses:
 *       200:
 *         description: Notices fetched successfully
 *   post:
 *     summary: Create notice
 *     tags: [Notices]
 *     security:
 *       - bearerAuth: []
 */
router
  .route('/')
  .get(listNotices)
  .post(authMiddleware, (req, res, next) => {
    try {
      validateCreateNoticePayload(req.body);
    } catch (err) {
      return next(err);
    }
    return requireRoles(Roles.ADMIN, Roles.TEACHER)(req, res, () => createNotice(req, res, next));
  });

router
  .route('/:id')
  .get(getNotice)
  .patch(authMiddleware, (req, res, next) => {
    try {
      validateUpdateNoticePayload(req.body);
    } catch (err) {
      return next(err);
    }
    return requireRoles(Roles.ADMIN, Roles.TEACHER)(req, res, () => updateNotice(req, res, next));
  })
  .delete(authMiddleware, (req, res, next) =>
    requireRoles(Roles.ADMIN, Roles.TEACHER)(req, res, () => deleteNotice(req, res, next)),
  );

module.exports = router;
