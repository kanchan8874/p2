const express = require('express');

const {
  listStudents,
  createStudent,
  getStudent,
  updateStudent,
  deleteStudent,
} = require('./students.controller');
const {
  validateCreateStudentPayload,
  validateUpdateStudentPayload,
} = require('./students.validation');

const router = express.Router();

router
  .route('/')
  .get(listStudents)
  .post((req, res, next) => {
    try {
      validateCreateStudentPayload(req.body);
    } catch (err) {
      return next(err);
    }
    return createStudent(req, res, next);
  });

router
  .route('/:id')
  .get(getStudent)
  .patch((req, res, next) => {
    try {
      validateUpdateStudentPayload(req.body);
    } catch (err) {
      return next(err);
    }
    return updateStudent(req, res, next);
  })
  .delete(deleteStudent);

module.exports = router;
