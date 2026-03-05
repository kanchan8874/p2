const { GalleryAlbum, GalleryImage } = require('./gallery.model');

// Albums
const listAlbums = async () => GalleryAlbum.find().exec();

const createAlbum = async (payload) => {
  const album = await GalleryAlbum.create(payload);
  return album;
};

const getAlbumById = async (id) => {
  const album = await GalleryAlbum.findById(id).exec();
  if (!album) {
    const error = new Error('Album not found');
    error.statusCode = 404;
    throw error;
  }
  return album;
};

const updateAlbum = async (id, payload) => {
  const album = await GalleryAlbum.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).exec();
  if (!album) {
    const error = new Error('Album not found');
    error.statusCode = 404;
    throw error;
  }
  return album;
};

const deleteAlbum = async (id) => {
  const album = await GalleryAlbum.findByIdAndDelete(id).exec();
  if (!album) {
    const error = new Error('Album not found');
    error.statusCode = 404;
    throw error;
  }
  return album;
};

// Images
const listImagesForAlbum = async (albumId) => GalleryImage.find({ album: albumId }).exec();

const createImage = async (payload) => {
  const image = await GalleryImage.create(payload);
  return image;
};

const deleteImage = async (id) => {
  const image = await GalleryImage.findByIdAndDelete(id).exec();
  if (!image) {
    const error = new Error('Image not found');
    error.statusCode = 404;
    throw error;
  }
  return image;
};

module.exports = {
  listAlbums,
  createAlbum,
  getAlbumById,
  updateAlbum,
  deleteAlbum,

  listImagesForAlbum,
  createImage,
  deleteImage,
};
