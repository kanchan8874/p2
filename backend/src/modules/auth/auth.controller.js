const { successResponse } = require('../../utils/apiResponse');
const { asyncHandler } = require('../../utils/asyncHandler');
const authService = require('./auth.service');

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);
  return successResponse(res, result, 'Logged in successfully');
});

const logout = asyncHandler(async (req, res) => {
  await authService.logout(req.user?.id);
  return successResponse(res, null, 'Logged out successfully');
});

const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getCurrentUser(req.user);
  return successResponse(res, user, 'Current user');
});

module.exports = {
  login,
  logout,
  getMe,
};
