const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
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
    startDateTime: {
      type: Date,
      required: true,
    },
    endDateTime: {
      type: Date,
    },
    location: {
      type: String,
      trim: true,
    },
    visibility: {
      type: String,
      enum: ['PUBLIC', 'STUDENTS_ONLY', 'FACULTY_ONLY'],
      default: 'PUBLIC',
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

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
