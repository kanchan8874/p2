const mongoose = require('mongoose');

const feeStructureSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
      trim: true,
    },
    academicYear: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const feeInvoiceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    invoiceNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    academicYear: {
      type: String,
      required: true,
      trim: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['PENDING', 'PAID', 'PARTIAL', 'OVERDUE'],
      default: 'PENDING',
    },
  },
  {
    timestamps: true,
  },
);

const paymentSchema = new mongoose.Schema(
  {
    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FeeInvoice',
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    method: {
      type: String,
      enum: ['CASH', 'CARD', 'ONLINE'],
      default: 'ONLINE',
    },
    status: {
      type: String,
      enum: ['SUCCESS', 'FAILED', 'PENDING'],
      default: 'SUCCESS',
    },
    paidAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const FeeStructure = mongoose.model('FeeStructure', feeStructureSchema);
const FeeInvoice = mongoose.model('FeeInvoice', feeInvoiceSchema);
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = {
  FeeStructure,
  FeeInvoice,
  Payment,
};
