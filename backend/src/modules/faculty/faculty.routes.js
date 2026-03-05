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

const router = express.Router();

router
  .route('/')
  .get(listFaculty)
  .post((req, res, next) => {
    try {
      validateCreateFacultyPayload(req.body);
    } catch (err) {
      return next(err);
    }
    return createFaculty(req, res, next);
  });

router
  .route('/:id')
  .get(getFaculty)
  .patch((req, res, next) => {
    try {
      validateUpdateFacultyPayload(req.body);
    } catch (err) {
      return next(err);
    }
    return updateFaculty(req, res, next);
  })
  .delete(deleteFaculty);

module.exports = router;
