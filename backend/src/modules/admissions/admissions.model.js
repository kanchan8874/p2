const mongoose = require('mongoose');

const admissionApplicationSchema = new mongoose.Schema(
  {
    applicationNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
    },
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    contactPhone: {
      type: String,
      trim: true,
    },
    appliedClass: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED', 'WAITLISTED'],
      default: 'PENDING',
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    processedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    remarks: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const AdmissionApplication = mongoose.model('AdmissionApplication', admissionApplicationSchema);

module.exports = AdmissionApplication;
