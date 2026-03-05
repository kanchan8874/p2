const { asyncHandler } = require('../../utils/asyncHandler');
const { successResponse } = require('../../utils/apiResponse');
const admissionsService = require('./admissions.service');

const listApplications = asyncHandler(async (req, res) => {
  const applications = await admissionsService.listApplications();
  return successResponse(res, applications, 'Applications fetched successfully');
});

const createApplication = asyncHandler(async (req, res) => {
  const application = await admissionsService.createApplication(req.body);
  return successResponse(res, application, 'Application created successfully', 201);
});

const getApplication = asyncHandler(async (req, res) => {
  const application = await admissionsService.getApplicationById(req.params.id);
  return successResponse(res, application, 'Application fetched successfully');
});

const updateApplication = asyncHandler(async (req, res) => {
  const application = await admissionsService.updateApplication(req.params.id, req.body);
  return successResponse(res, application, 'Application updated successfully');
});

const deleteApplication = asyncHandler(async (req, res) => {
  const application = await admissionsService.deleteApplication(req.params.id);
  return successResponse(res, application, 'Application deleted successfully');
});

module.exports = {
  listApplications,
  createApplication,
  getApplication,
  updateApplication,
  deleteApplication,
};
