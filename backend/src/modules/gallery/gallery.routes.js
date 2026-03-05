const express = require('express');

const {
  listAlbums,
  createAlbum,
  getAlbum,
  updateAlbum,
  deleteAlbum,
  listImagesForAlbum,
  createImage,
  deleteImage,
} = require('./gallery.controller');
const {
  validateCreateAlbumPayload,
  validateCreateImagePayload,
} = require('./gallery.validation');
const { authMiddleware, requireRoles } = require('../../middlewares/auth.middleware');
const { Roles } = require('../../constants/roles');

const router = express.Router();

// Albums
router
  .route('/albums')
  .get(listAlbums)
  .post(authMiddleware, (req, res, next) => {
    try {
      validateCreateAlbumPayload(req.body);
    } catch (err) {
      return next(err);
    }
    return requireRoles(Roles.ADMIN, Roles.TEACHER)(req, res, () => createAlbum(req, res, next));
  });

router
  .route('/albums/:id')
  .get(getAlbum)
  .patch(authMiddleware, (req, res, next) =>
    requireRoles(Roles.ADMIN, Roles.TEACHER)(req, res, () => updateAlbum(req, res, next)),
  )
  .delete(authMiddleware, (req, res, next) =>
    requireRoles(Roles.ADMIN, Roles.TEACHER)(req, res, () => deleteAlbum(req, res, next)),
  );

// Images
router
  .route('/albums/:albumId/images')
  .get(listImagesForAlbum)
  .post(authMiddleware, (req, res, next) => {
    try {
      validateCreateImagePayload(req.body);
    } catch (err) {
      return next(err);
    }
    return requireRoles(Roles.ADMIN, Roles.TEACHER)(req, res, () => createImage(req, res, next));
  });

router
  .route('/images/:imageId')
  .delete(authMiddleware, (req, res, next) =>
    requireRoles(Roles.ADMIN, Roles.TEACHER)(req, res, () => deleteImage(req, res, next)),
  );

module.exports = router;
