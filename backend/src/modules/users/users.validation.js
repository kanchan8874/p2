const { AllRoles } = require('../../constants/roles');

const validateCreateUserPayload = ({ email, password, role, profile }) => {
  if (!email || typeof email !== 'string') {
    const error = new Error('Email is required');
    error.statusCode = 400;
    throw error;
  }

  if (!password || typeof password !== 'string') {
    const error = new Error('Password is required');
    error.statusCode = 400;
    throw error;
  }

  if (!role || !AllRoles.includes(role)) {
    const error = new Error('Invalid role');
    error.statusCode = 400;
    throw error;
  }

  if (profile && typeof profile !== 'object') {
    const error = new Error('Profile must be an object');
    error.statusCode = 400;
    throw error;
  }
};

const validateUpdateUserPayload = (payload) => {
  if (!payload || typeof payload !== 'object') {
    const error = new Error('Invalid update payload');
    error.statusCode = 400;
    throw error;
  }

  if (payload.role && !AllRoles.includes(payload.role)) {
    const error = new Error('Invalid role');
    error.statusCode = 400;
    throw error;
  }

  if (payload.profile && typeof payload.profile !== 'object') {
    const error = new Error('Profile must be an object');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  validateCreateUserPayload,
  validateUpdateUserPayload,
};
