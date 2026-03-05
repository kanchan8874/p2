const { asyncHandler } = require('../../utils/asyncHandler');
const { successResponse } = require('../../utils/apiResponse');
const userService = require('./users.service');

const listUsers = asyncHandler(async (req, res) => {
  const users = await userService.listUsers();
  return successResponse(res, users, 'Users fetched successfully');
});

const createUser = asyncHandler(async (req, res) => {
  const user = await userService.createUser(req.body);
  return successResponse(res, user, 'User created successfully', 201);
});

const getUser = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  return successResponse(res, user, 'User fetched successfully');
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  return successResponse(res, user, 'User updated successfully');
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await userService.deleteUser(req.params.id);
  return successResponse(res, user, 'User deleted successfully');
});

module.exports = {
  listUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
