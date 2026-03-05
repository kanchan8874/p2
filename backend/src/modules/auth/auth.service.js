const User = require('../users/users.model');
const { comparePassword } = require('../../security/password');
const { signAccessToken } = require('../../security/jwt');

const login = async ({ email, password }) => {
  if (!email || !password) {
    const error = new Error('Email and password are required');
    error.statusCode = 400;
    throw error;
  }

  const normalizedEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail }).exec();

  if (!user) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await comparePassword(password, user.passwordHash);
  if (!isMatch) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const tokenPayload = {
    sub: user.id,
    role: user.role,
    email: user.email,
  };

  const accessToken = signAccessToken(tokenPayload);

  const safeUser = {
    id: user.id,
    email: user.email,
    role: user.role,
    profile: user.profile,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return {
    user: safeUser,
    tokens: {
      accessToken,
    },
  };
};

const logout = async (userId) => {
  // Stateless JWT: nothing to persist for now.
  return { userId };
};

const getCurrentUser = async (userContext) => {
  if (!userContext || !userContext.id) {
    const error = new Error('Unauthorized');
    error.statusCode = 401;
    throw error;
  }

  const user = await User.findById(userContext.id).exec();
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  return {
    id: user.id,
    email: user.email,
    role: user.role,
    profile: user.profile,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

module.exports = {
  login,
  logout,
  getCurrentUser,
};
