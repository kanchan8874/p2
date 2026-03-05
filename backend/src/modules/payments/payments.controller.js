const { asyncHandler } = require('../../utils/asyncHandler');
const { successResponse } = require('../../utils/apiResponse');
const paymentsService = require('./payments.service');

// Fee structures
const listFeeStructures = asyncHandler(async (req, res) => {
  const data = await paymentsService.listFeeStructures();
  return successResponse(res, data, 'Fee structures fetched successfully');
});

const createFeeStructure = asyncHandler(async (req, res) => {
  const fs = await paymentsService.createFeeStructure(req.body);
  return successResponse(res, fs, 'Fee structure created successfully', 201);
});

// Invoices
const listInvoices = asyncHandler(async (req, res) => {
  const invoices = await paymentsService.listInvoices();
  return successResponse(res, invoices, 'Invoices fetched successfully');
});

const createInvoice = asyncHandler(async (req, res) => {
  const invoice = await paymentsService.createInvoice(req.body);
  return successResponse(res, invoice, 'Invoice created successfully', 201);
});

const getInvoice = asyncHandler(async (req, res) => {
  const invoice = await paymentsService.getInvoiceById(req.params.id);
  return successResponse(res, invoice, 'Invoice fetched successfully');
});

const updateInvoiceStatus = asyncHandler(async (req, res) => {
  const invoice = await paymentsService.updateInvoiceStatus(req.params.id, req.body.status);
  return successResponse(res, invoice, 'Invoice status updated successfully');
});

// Payments
const listPayments = asyncHandler(async (req, res) => {
  const payments = await paymentsService.listPayments();
  return successResponse(res, payments, 'Payments fetched successfully');
});

const createPayment = asyncHandler(async (req, res) => {
  const payment = await paymentsService.createPayment(req.body);
  return successResponse(res, payment, 'Payment recorded successfully', 201);
});

const getPayment = asyncHandler(async (req, res) => {
  const payment = await paymentsService.getPaymentById(req.params.id);
  return successResponse(res, payment, 'Payment fetched successfully');
});

module.exports = {
  listFeeStructures,
  createFeeStructure,

  listInvoices,
  createInvoice,
  getInvoice,
  updateInvoiceStatus,

  listPayments,
  createPayment,
  getPayment,
};
