const express = require('express');

const {
  listFeeStructures,
  createFeeStructure,
  listInvoices,
  createInvoice,
  getInvoice,
  updateInvoiceStatus,
  listPayments,
  createPayment,
  getPayment,
} = require('./payments.controller');
const {
  validateCreateFeeStructurePayload,
  validateCreateInvoicePayload,
  validateCreatePaymentPayload,
} = require('./payments.validation');

const router = express.Router();

// Fee structures
router
  .route('/fee-structures')
  .get(listFeeStructures)
  .post((req, res, next) => {
    try {
      validateCreateFeeStructurePayload(req.body);
    } catch (err) {
      return next(err);
    }
    return createFeeStructure(req, res, next);
  });

// Invoices
router
  .route('/invoices')
  .get(listInvoices)
  .post((req, res, next) => {
    try {
      validateCreateInvoicePayload(req.body);
    } catch (err) {
      return next(err);
    }
    return createInvoice(req, res, next);
  });

router
  .route('/invoices/:id')
  .get(getInvoice)
  .patch(updateInvoiceStatus);

// Payments
router
  .route('/transactions')
  .get(listPayments)
  .post((req, res, next) => {
    try {
      validateCreatePaymentPayload(req.body);
    } catch (err) {
      return next(err);
    }
    return createPayment(req, res, next);
  });

router.route('/transactions/:id').get(getPayment);

module.exports = router;
