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

const router = express.Router();

// Albums
router
  .route('/albums')
  .get(listAlbums)
  .post((req, res, next) => {
    try {
      validateCreateAlbumPayload(req.body);
    } catch (err) {
      return next(err);
    }
    return createAlbum(req, res, next);
  });

router
  .route('/albums/:id')
  .get(getAlbum)
  .patch(updateAlbum)
  .delete(deleteAlbum);

// Images
router
  .route('/albums/:albumId/images')
  .get(listImagesForAlbum)
  .post((req, res, next) => {
    try {
      validateCreateImagePayload(req.body);
    } catch (err) {
      return next(err);
    }
    return createImage(req, res, next);
  });

router.route('/images/:imageId').delete(deleteImage);

module.exports = router;
