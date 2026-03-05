const express = require('express');

const {
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
} = require('./academics.controller');
const {
  validateCreateAcademicYearPayload,
  validateCreateClassPayload,
  validateCreateSubjectPayload,
} = require('./academics.validation');

const router = express.Router();

// Academic years
router
  .route('/years')
  .get(listAcademicYears)
  .post((req, res, next) => {
    try {
      validateCreateAcademicYearPayload(req.body);
    } catch (err) {
      return next(err);
    }
    return createAcademicYear(req, res, next);
  });

router
  .route('/years/:id')
  .get(getAcademicYear)
  .patch(updateAcademicYear)
  .delete(deleteAcademicYear);

// Classes
router
  .route('/classes')
  .get(listClasses)
  .post((req, res, next) => {
    try {
      validateCreateClassPayload(req.body);
    } catch (err) {
      return next(err);
    }
    return createClass(req, res, next);
  });

router
  .route('/classes/:id')
  .get(getClass)
  .patch(updateClass)
  .delete(deleteClass);

// Subjects
router
  .route('/subjects')
  .get(listSubjects)
  .post((req, res, next) => {
    try {
      validateCreateSubjectPayload(req.body);
    } catch (err) {
      return next(err);
    }
    return createSubject(req, res, next);
  });

router
  .route('/subjects/:id')
  .get(getSubject)
  .patch(updateSubject)
  .delete(deleteSubject);

module.exports = router;
