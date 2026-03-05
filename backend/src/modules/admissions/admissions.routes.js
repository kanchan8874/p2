const express = require('express');

const {
  listApplications,
  createApplication,
  getApplication,
  updateApplication,
  deleteApplication,
} = require('./admissions.controller');
const {
  validateCreateApplicationPayload,
  validateUpdateApplicationPayload,
} = require('./admissions.validation');

const router = express.Router();

router
  .route('/')
  .get(listApplications)
  .post((req, res, next) => {
    try {
      validateCreateApplicationPayload(req.body);
    } catch (err) {
      return next(err);
    }
    return createApplication(req, res, next);
  });

router
  .route('/:id')
  .get(getApplication)
  .patch((req, res, next) => {
    try {
      validateUpdateApplicationPayload(req.body);
    } catch (err) {
      return next(err);
    }
    return updateApplication(req, res, next);
  })
  .delete(deleteApplication);

module.exports = router;
