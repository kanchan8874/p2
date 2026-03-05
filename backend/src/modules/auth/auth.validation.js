// Placeholder validation schemas for auth requests.
// In the next steps, you can plug in Joi/Zod/Yup here.

const validateLoginPayload = (payload) => {
  if (!payload || typeof payload.email !== 'string' || typeof payload.password !== 'string') {
    const error = new Error('Invalid login payload');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  validateLoginPayload,
};
