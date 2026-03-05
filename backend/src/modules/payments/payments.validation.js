const validateCreateFeeStructurePayload = (payload) => {
  if (!payload || typeof payload !== 'object') {
    const error = new Error('Invalid fee structure payload');
    error.statusCode = 400;
    throw error;
  }

  const required = ['className', 'academicYear', 'amount'];
  for (const field of required) {
    if (!payload[field]) {
      const error = new Error(`${field} is required`);
      error.statusCode = 400;
      throw error;
    }
  }
};

const validateCreateInvoicePayload = (payload) => {
  if (!payload || typeof payload !== 'object') {
    const error = new Error('Invalid invoice payload');
    error.statusCode = 400;
    throw error;
  }

  const required = ['student', 'invoiceNo', 'academicYear', 'dueDate', 'totalAmount'];
  for (const field of required) {
    if (!payload[field]) {
      const error = new Error(`${field} is required`);
      error.statusCode = 400;
      throw error;
    }
  }
};

const validateCreatePaymentPayload = (payload) => {
  if (!payload || typeof payload !== 'object') {
    const error = new Error('Invalid payment payload');
    error.statusCode = 400;
    throw error;
  }

  const required = ['invoice', 'transactionId', 'amount'];
  for (const field of required) {
    if (!payload[field]) {
      const error = new Error(`${field} is required`);
      error.statusCode = 400;
      throw error;
    }
  }
};

module.exports = {
  validateCreateFeeStructurePayload,
  validateCreateInvoicePayload,
  validateCreatePaymentPayload,
};
