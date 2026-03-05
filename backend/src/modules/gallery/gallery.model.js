const mongoose = require('mongoose');

const galleryAlbumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    coverImageUrl: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

const galleryImageSchema = new mongoose.Schema(
  {
    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'GalleryAlbum',
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    caption: {
      type: String,
      trim: true,
    },
    takenAt: {
      type: Date,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

const GalleryAlbum = mongoose.model('GalleryAlbum', galleryAlbumSchema);
const GalleryImage = mongoose.model('GalleryImage', galleryImageSchema);

module.exports = {
  GalleryAlbum,
  GalleryImage,
};
