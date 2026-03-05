const User = require('./users.model');
const { hashPassword } = require('../../security/password');

const buildSafeUser = (userDoc) => ({
  id: userDoc.id,
  email: userDoc.email,
  role: userDoc.role,
  profile: userDoc.profile,
  createdAt: userDoc.createdAt,
  updatedAt: userDoc.updatedAt,
});

const listUsers = async () => {
  const users = await User.find().exec();
  return users.map(buildSafeUser);
};

const createUser = async ({ email, password, role, profile }) => {
  const normalizedEmail = email.toLowerCase().trim();

  const existing = await User.findOne({ email: normalizedEmail }).exec();
  if (existing) {
    const error = new Error('User with this email already exists');
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await hashPassword(password);

  const user = await User.create({
    email: normalizedEmail,
    passwordHash,
    role,
    profile: profile || {},
  });

  return buildSafeUser(user);
};

const getUserById = async (id) => {
  const user = await User.findById(id).exec();
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }
  return buildSafeUser(user);
};

const updateUser = async (id, updatePayload) => {
  const update = {};

  if (updatePayload.email) {
    update.email = updatePayload.email.toLowerCase().trim();
  }
  if (updatePayload.role) {
    update.role = updatePayload.role;
  }
  if (updatePayload.profile) {
    update.profile = updatePayload.profile;
  }

  const user = await User.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
  }).exec();

  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  return buildSafeUser(user);
};

const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id).exec();
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }
  return buildSafeUser(user);
};

module.exports = {
  listUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
