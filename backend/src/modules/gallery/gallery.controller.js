const { asyncHandler } = require('../../utils/asyncHandler');
const { successResponse } = require('../../utils/apiResponse');
const galleryService = require('./gallery.service');

// Albums
const listAlbums = asyncHandler(async (req, res) => {
  const albums = await galleryService.listAlbums();
  return successResponse(res, albums, 'Albums fetched successfully');
});

const createAlbum = asyncHandler(async (req, res) => {
  const album = await galleryService.createAlbum(req.body);
  return successResponse(res, album, 'Album created successfully', 201);
});

const getAlbum = asyncHandler(async (req, res) => {
  const album = await galleryService.getAlbumById(req.params.id);
  return successResponse(res, album, 'Album fetched successfully');
});

const updateAlbum = asyncHandler(async (req, res) => {
  const album = await galleryService.updateAlbum(req.params.id, req.body);
  return successResponse(res, album, 'Album updated successfully');
});

const deleteAlbum = asyncHandler(async (req, res) => {
  const album = await galleryService.deleteAlbum(req.params.id);
  return successResponse(res, album, 'Album deleted successfully');
});

// Images
const listImagesForAlbum = asyncHandler(async (req, res) => {
  const images = await galleryService.listImagesForAlbum(req.params.albumId);
  return successResponse(res, images, 'Images fetched successfully');
});

const createImage = asyncHandler(async (req, res) => {
  const image = await galleryService.createImage({
    ...req.body,
    album: req.params.albumId,
  });
  return successResponse(res, image, 'Image created successfully', 201);
});

const deleteImage = asyncHandler(async (req, res) => {
  const image = await galleryService.deleteImage(req.params.imageId);
  return successResponse(res, image, 'Image deleted successfully');
});

module.exports = {
  listAlbums,
  createAlbum,
  getAlbum,
  updateAlbum,
  deleteAlbum,
  listImagesForAlbum,
  createImage,
  deleteImage,
};
