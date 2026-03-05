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
const { authMiddleware, requireRoles } = require('../../middlewares/auth.middleware');
const { Roles } = require('../../constants/roles');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Academics
 *   description: Academic years, classes, and subjects
 */

// Read access for all authenticated; write restricted to ADMIN/TEACHER
router.use(authMiddleware);

/**
 * @swagger
 * /academics/years:
 *   get:
 *     summary: List academic years
 *     tags: [Academics]
 *     security:
 *       - bearerAuth: []
 *   post:
 *     summary: Create academic year
 *     tags: [Academics]
 *     security:
 *       - bearerAuth: []
 */
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
    return requireRoles(Roles.ADMIN, Roles.TEACHER)(req, res, () =>
      createAcademicYear(req, res, next),
    );
  });

router
  .route('/years/:id')
  .get(getAcademicYear)
  .patch((req, res, next) =>
    requireRoles(Roles.ADMIN, Roles.TEACHER)(req, res, () => updateAcademicYear(req, res, next)),
  )
  .delete((req, res, next) =>
    requireRoles(Roles.ADMIN, Roles.TEACHER)(req, res, () => deleteAcademicYear(req, res, next)),
  );

/**
 * @swagger
 * /academics/classes:
 *   get:
 *     summary: List classes
 *     tags: [Academics]
 *     security:
 *       - bearerAuth: []
 *   post:
 *     summary: Create class
 *     tags: [Academics]
 *     security:
 *       - bearerAuth: []
 */
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
    return requireRoles(Roles.ADMIN, Roles.TEACHER)(req, res, () => createClass(req, res, next));
  });

router
  .route('/classes/:id')
  .get(getClass)
  .patch((req, res, next) =>
    requireRoles(Roles.ADMIN, Roles.TEACHER)(req, res, () => updateClass(req, res, next)),
  )
  .delete((req, res, next) =>
    requireRoles(Roles.ADMIN, Roles.TEACHER)(req, res, () => deleteClass(req, res, next)),
  );

/**
 * @swagger
 * /academics/subjects:
 *   get:
 *     summary: List subjects
 *     tags: [Academics]
 *     security:
 *       - bearerAuth: []
 *   post:
 *     summary: Create subject
 *     tags: [Academics]
 *     security:
 *       - bearerAuth: []
 */
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
    return requireRoles(Roles.ADMIN, Roles.TEACHER)(req, res, () =>
      createSubject(req, res, next),
    );
  });

router
  .route('/subjects/:id')
  .get(getSubject)
  .patch((req, res, next) =>
    requireRoles(Roles.ADMIN, Roles.TEACHER)(req, res, () => updateSubject(req, res, next)),
  )
  .delete((req, res, next) =>
    requireRoles(Roles.ADMIN, Roles.TEACHER)(req, res, () => deleteSubject(req, res, next)),
  );

module.exports = router;
