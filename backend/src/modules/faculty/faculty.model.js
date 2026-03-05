const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    employeeCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    designation: {
      type: String,
      trim: true,
    },
    department: {
      type: String,
      trim: true,
    },
    subjects: [
      {
        type: String,
        trim: true,
      },
    ],
    joiningDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const Faculty = mongoose.model('Faculty', facultySchema);

module.exports = Faculty;
