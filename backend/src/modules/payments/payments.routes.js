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
const { authMiddleware, requireRoles } = require('../../middlewares/auth.middleware');
const { Roles } = require('../../constants/roles');

const router = express.Router();

// All payments routes require ADMIN (finance)
router.use(authMiddleware, requireRoles(Roles.ADMIN));

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
