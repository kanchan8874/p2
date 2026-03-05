const { asyncHandler } = require('../../utils/asyncHandler');
const { successResponse } = require('../../utils/apiResponse');
const academicsService = require('./academics.service');

// Academic Years
const listAcademicYears = asyncHandler(async (req, res) => {
  const years = await academicsService.listAcademicYears();
  return successResponse(res, years, 'Academic years fetched successfully');
});

const createAcademicYear = asyncHandler(async (req, res) => {
  const year = await academicsService.createAcademicYear(req.body);
  return successResponse(res, year, 'Academic year created successfully', 201);
});

const getAcademicYear = asyncHandler(async (req, res) => {
  const year = await academicsService.getAcademicYearById(req.params.id);
  return successResponse(res, year, 'Academic year fetched successfully');
});

const updateAcademicYear = asyncHandler(async (req, res) => {
  const year = await academicsService.updateAcademicYear(req.params.id, req.body);
  return successResponse(res, year, 'Academic year updated successfully');
});

const deleteAcademicYear = asyncHandler(async (req, res) => {
  const year = await academicsService.deleteAcademicYear(req.params.id);
  return successResponse(res, year, 'Academic year deleted successfully');
});

// Classes
const listClasses = asyncHandler(async (req, res) => {
  const classes = await academicsService.listClasses();
  return successResponse(res, classes, 'Classes fetched successfully');
});

const createClass = asyncHandler(async (req, res) => {
  const cls = await academicsService.createClass(req.body);
  return successResponse(res, cls, 'Class created successfully', 201);
});

const getClass = asyncHandler(async (req, res) => {
  const cls = await academicsService.getClassById(req.params.id);
  return successResponse(res, cls, 'Class fetched successfully');
});

const updateClass = asyncHandler(async (req, res) => {
  const cls = await academicsService.updateClass(req.params.id, req.body);
  return successResponse(res, cls, 'Class updated successfully');
});

const deleteClass = asyncHandler(async (req, res) => {
  const cls = await academicsService.deleteClass(req.params.id);
  return successResponse(res, cls, 'Class deleted successfully');
});

// Subjects
const listSubjects = asyncHandler(async (req, res) => {
  const subjects = await academicsService.listSubjects();
  return successResponse(res, subjects, 'Subjects fetched successfully');
});

const createSubject = asyncHandler(async (req, res) => {
  const subject = await academicsService.createSubject(req.body);
  return successResponse(res, subject, 'Subject created successfully', 201);
});

const getSubject = asyncHandler(async (req, res) => {
  const subject = await academicsService.getSubjectById(req.params.id);
  return successResponse(res, subject, 'Subject fetched successfully');
});

const updateSubject = asyncHandler(async (req, res) => {
  const subject = await academicsService.updateSubject(req.params.id, req.body);
  return successResponse(res, subject, 'Subject updated successfully');
});

const deleteSubject = asyncHandler(async (req, res) => {
  const subject = await academicsService.deleteSubject(req.params.id);
  return successResponse(res, subject, 'Subject deleted successfully');
});

module.exports = {
  listAcademicYears,
  createAcademicYear,
  getAcademicYear,
  updateAcademicYear,
  deleteAcademicYear,

  listClasses,
  createClass,
  getClass,
  updateClass,
  deleteClass,

  listSubjects,
  createSubject,
  getSubject,
  updateSubject,
  deleteSubject,
};
