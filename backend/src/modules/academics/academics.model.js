const mongoose = require('mongoose');

const academicYearSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    academicYear: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AcademicYear',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    classRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const AcademicYear = mongoose.model('AcademicYear', academicYearSchema);
const Class = mongoose.model('Class', classSchema);
const Subject = mongoose.model('Subject', subjectSchema);

module.exports = {
  AcademicYear,
  Class,
  Subject,
};
