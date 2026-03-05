const express = require('express');

const {
  getStudentDashboard,
  getFacultyDashboard,
  getAdminDashboard,
} = require('./portal.controller');
const { authMiddleware, requireRoles } = require('../../middlewares/auth.middleware');
const { Roles } = require('../../constants/roles');

const router = express.Router();

router.use(authMiddleware);

router.get('/student/dashboard', requireRoles(Roles.STUDENT), getStudentDashboard);
router.get('/faculty/dashboard', requireRoles(Roles.TEACHER), getFacultyDashboard);
router.get('/admin/dashboard', requireRoles(Roles.ADMIN), getAdminDashboard);

module.exports = router;
