const express = require('express');

const {
  listFaculty,
  createFaculty,
  getFaculty,
  updateFaculty,
  deleteFaculty,
} = require('./faculty.controller');
const {
  validateCreateFacultyPayload,
  validateUpdateFacultyPayload,
} = require('./faculty.validation');
const { authMiddleware, requireRoles } = require('../../middlewares/auth.middleware');
const { Roles } = require('../../constants/roles');

const router = express.Router();

router.use(authMiddleware);

router
  .route('/')
  .get(requireRoles(Roles.ADMIN, Roles.TEACHER), listFaculty)
  .post((req, res, next) => {
    try {
      validateCreateFacultyPayload(req.body);
    } catch (err) {
      return next(err);
    }
    return requireRoles(Roles.ADMIN)(req, res, () => createFaculty(req, res, next));
  });

router
  .route('/:id')
  .get(requireRoles(Roles.ADMIN, Roles.TEACHER), getFaculty)
  .patch((req, res, next) => {
    try {
      validateUpdateFacultyPayload(req.body);
    } catch (err) {
      return next(err);
    }
    return requireRoles(Roles.ADMIN)(req, res, () => updateFaculty(req, res, next));
  })
  .delete((req, res, next) => requireRoles(Roles.ADMIN)(req, res, () => deleteFaculty(req, res, next)));

module.exports = router;
