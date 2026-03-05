const { asyncHandler } = require('../../utils/asyncHandler');
const { successResponse } = require('../../utils/apiResponse');
const facultyService = require('./faculty.service');

const listFaculty = asyncHandler(async (req, res) => {
  const faculty = await facultyService.listFaculty();
  return successResponse(res, faculty, 'Faculty fetched successfully');
});

const createFaculty = asyncHandler(async (req, res) => {
  const faculty = await facultyService.createFaculty(req.body);
  return successResponse(res, faculty, 'Faculty created successfully', 201);
});

const getFaculty = asyncHandler(async (req, res) => {
  const faculty = await facultyService.getFacultyById(req.params.id);
  return successResponse(res, faculty, 'Faculty fetched successfully');
});

const updateFaculty = asyncHandler(async (req, res) => {
  const faculty = await facultyService.updateFaculty(req.params.id, req.body);
  return successResponse(res, faculty, 'Faculty updated successfully');
});

const deleteFaculty = asyncHandler(async (req, res) => {
  const faculty = await facultyService.deleteFaculty(req.params.id);
  return successResponse(res, faculty, 'Faculty deleted successfully');
});

module.exports = {
  listFaculty,
  createFaculty,
  getFaculty,
  updateFaculty,
  deleteFaculty,
};
