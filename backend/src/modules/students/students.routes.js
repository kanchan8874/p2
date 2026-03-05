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
const { authMiddleware, requireRoles } = require('../../middlewares/auth.middleware');
const { Roles } = require('../../constants/roles');

const router = express.Router();

// Students management restricted to ADMIN (and TEACHER for reads)
router.use(authMiddleware);

router
  .route('/')
  .get(requireRoles(Roles.ADMIN, Roles.TEACHER), listStudents)
  .post((req, res, next) => {
    try {
      validateCreateStudentPayload(req.body);
    } catch (err) {
      return next(err);
    }
    return requireRoles(Roles.ADMIN)(req, res, () => createStudent(req, res, next));
  });

router
  .route('/:id')
  .get(requireRoles(Roles.ADMIN, Roles.TEACHER), getStudent)
  .patch((req, res, next) => {
    try {
      validateUpdateStudentPayload(req.body);
    } catch (err) {
      return next(err);
    }
    return requireRoles(Roles.ADMIN)(req, res, () => updateStudent(req, res, next));
  })
  .delete((req, res, next) => requireRoles(Roles.ADMIN)(req, res, () => deleteStudent(req, res, next)));

module.exports = router;
