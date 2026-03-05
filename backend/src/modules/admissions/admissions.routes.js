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

/**
 * @swagger
 * tags:
 *   name: Admissions
 *   description: Admission applications
 */

/**
 * @swagger
 * /admissions:
 *   get:
 *     summary: List admission applications
 *     tags: [Admissions]
 *     responses:
 *       200:
 *         description: Applications fetched successfully
 *   post:
 *     summary: Submit a new admission application
 *     tags: [Admissions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               applicationNo:
 *                 type: string
 *               studentName:
 *                 type: string
 *               appliedClass:
 *                 type: string
 *     responses:
 *       201:
 *         description: Application created successfully
 */
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
  /**
   * @swagger
   * /admissions/{id}:
   *   get:
   *     summary: Get an admission application by ID
   *     tags: [Admissions]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Application fetched successfully
   *   patch:
   *     summary: Update an admission application
   *     tags: [Admissions]
   *   delete:
   *     summary: Delete an admission application
   *     tags: [Admissions]
   */
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
