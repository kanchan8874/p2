const express = require('express');

const {
  getStudentDashboard,
  getFacultyDashboard,
  getAdminDashboard,
} = require('./portal.controller');
const { authMiddleware } = require('../../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/student/dashboard', getStudentDashboard);
router.get('/faculty/dashboard', getFacultyDashboard);
router.get('/admin/dashboard', getAdminDashboard);

module.exports = router;
