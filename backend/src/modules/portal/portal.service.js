// Placeholder portal service that will later aggregate
// data from other modules (students, academics, payments, etc.).

const getStudentDashboard = async (userId) => ({
  userId,
  summary: 'Student dashboard data will be implemented later.',
});

const getFacultyDashboard = async (userId) => ({
  userId,
  summary: 'Faculty dashboard data will be implemented later.',
});

const getAdminDashboard = async () => ({
  summary: 'Admin dashboard data will be implemented later.',
});

module.exports = {
  getStudentDashboard,
  getFacultyDashboard,
  getAdminDashboard,
};
