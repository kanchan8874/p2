const Faculty = require('./faculty.model');

const buildSafeFaculty = (doc) => ({
  id: doc.id,
  user: doc.user,
  employeeCode: doc.employeeCode,
  designation: doc.designation,
  department: doc.department,
  subjects: doc.subjects,
  joiningDate: doc.joiningDate,
  createdAt: doc.createdAt,
  updatedAt: doc.updatedAt,
});

const listFaculty = async () => {
  const faculty = await Faculty.find().exec();
  return faculty.map(buildSafeFaculty);
};

const createFaculty = async (payload) => {
  const existing = await Faculty.findOne({ employeeCode: payload.employeeCode }).exec();
  if (existing) {
    const error = new Error('Faculty with this employee code already exists');
    error.statusCode = 409;
    throw error;
  }

  const faculty = await Faculty.create(payload);
  return buildSafeFaculty(faculty);
};

const getFacultyById = async (id) => {
  const faculty = await Faculty.findById(id).exec();
  if (!faculty) {
    const error = new Error('Faculty not found');
    error.statusCode = 404;
    throw error;
  }
  return buildSafeFaculty(faculty);
};

const updateFaculty = async (id, payload) => {
  const faculty = await Faculty.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).exec();

  if (!faculty) {
    const error = new Error('Faculty not found');
    error.statusCode = 404;
    throw error;
  }

  return buildSafeFaculty(faculty);
};

const deleteFaculty = async (id) => {
  const faculty = await Faculty.findByIdAndDelete(id).exec();
  if (!faculty) {
    const error = new Error('Faculty not found');
    error.statusCode = 404;
    throw error;
  }
  return buildSafeFaculty(faculty);
};

module.exports = {
  listFaculty,
  createFaculty,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
};
