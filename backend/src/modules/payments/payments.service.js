const { FeeStructure, FeeInvoice, Payment } = require('./payments.model');

// Fee structures
const listFeeStructures = async () => FeeStructure.find().exec();

const createFeeStructure = async (payload) => {
  const fs = await FeeStructure.create(payload);
  return fs;
};

// Invoices
const listInvoices = async () => FeeInvoice.find().exec();

const createInvoice = async (payload) => {
  const invoice = await FeeInvoice.create(payload);
  return invoice;
};

const getInvoiceById = async (id) => {
  const invoice = await FeeInvoice.findById(id).exec();
  if (!invoice) {
    const error = new Error('Invoice not found');
    error.statusCode = 404;
    throw error;
  }
  return invoice;
};

const updateInvoiceStatus = async (id, status) => {
  const invoice = await FeeInvoice.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true },
  ).exec();
  if (!invoice) {
    const error = new Error('Invoice not found');
    error.statusCode = 404;
    throw error;
  }
  return invoice;
};

// Payments
const listPayments = async () => Payment.find().exec();

const createPayment = async (payload) => {
  const payment = await Payment.create(payload);
  return payment;
};

const getPaymentById = async (id) => {
  const payment = await Payment.findById(id).exec();
  if (!payment) {
    const error = new Error('Payment not found');
    error.statusCode = 404;
    throw error;
  }
  return payment;
};

module.exports = {
  listFeeStructures,
  createFeeStructure,

  listInvoices,
  createInvoice,
  getInvoiceById,
  updateInvoiceStatus,

  listPayments,
  createPayment,
  getPaymentById,
};
