const { asyncHandler } = require('../../utils/asyncHandler');
const { successResponse } = require('../../utils/apiResponse');
const studentService = require('./students.service');

const listStudents = asyncHandler(async (req, res) => {
  const students = await studentService.listStudents();
  return successResponse(res, students, 'Students fetched successfully');
});

const createStudent = asyncHandler(async (req, res) => {
  const student = await studentService.createStudent(req.body);
  return successResponse(res, student, 'Student created successfully', 201);
});

const getStudent = asyncHandler(async (req, res) => {
  const student = await studentService.getStudentById(req.params.id);
  return successResponse(res, student, 'Student fetched successfully');
});

const updateStudent = asyncHandler(async (req, res) => {
  const student = await studentService.updateStudent(req.params.id, req.body);
  return successResponse(res, student, 'Student updated successfully');
});

const deleteStudent = asyncHandler(async (req, res) => {
  const student = await studentService.deleteStudent(req.params.id);
  return successResponse(res, student, 'Student deleted successfully');
});

module.exports = {
  listStudents,
  createStudent,
  getStudent,
  updateStudent,
  deleteStudent,
};
