const { asyncHandler } = require('../../utils/asyncHandler');
const { successResponse } = require('../../utils/apiResponse');
const portalService = require('./portal.service');

const getStudentDashboard = asyncHandler(async (req, res) => {
  const data = await portalService.getStudentDashboard(req.user?.id);
  return successResponse(res, data, 'Student dashboard');
});

const getFacultyDashboard = asyncHandler(async (req, res) => {
  const data = await portalService.getFacultyDashboard(req.user?.id);
  return successResponse(res, data, 'Faculty dashboard');
});

const getAdminDashboard = asyncHandler(async (req, res) => {
  const data = await portalService.getAdminDashboard();
  return successResponse(res, data, 'Admin dashboard');
});

module.exports = {
  getStudentDashboard,
  getFacultyDashboard,
  getAdminDashboard,
};
