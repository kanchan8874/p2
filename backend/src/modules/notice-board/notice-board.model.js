const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['GENERAL', 'EXAM', 'FEE', 'HOLIDAY', 'OTHER'],
      default: 'GENERAL',
    },
    targetRoles: [
      {
        type: String,
        trim: true,
      },
    ],
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Notice = mongoose.model('Notice', noticeSchema);

module.exports = Notice;
