const Student = require('./students.model');

const buildSafeStudent = (doc) => ({
  id: doc.id,
  user: doc.user,
  studentCode: doc.studentCode,
  className: doc.className,
  section: doc.section,
  academicYear: doc.academicYear,
  guardianName: doc.guardianName,
  guardianContact: doc.guardianContact,
  address: doc.address,
  dateOfBirth: doc.dateOfBirth,
  gender: doc.gender,
  createdAt: doc.createdAt,
  updatedAt: doc.updatedAt,
});

const listStudents = async () => {
  const students = await Student.find().exec();
  return students.map(buildSafeStudent);
};

const createStudent = async (payload) => {
  const existing = await Student.findOne({ studentCode: payload.studentCode }).exec();
  if (existing) {
    const error = new Error('Student with this code already exists');
    error.statusCode = 409;
    throw error;
  }

  const student = await Student.create(payload);
  return buildSafeStudent(student);
};

const getStudentById = async (id) => {
  const student = await Student.findById(id).exec();
  if (!student) {
    const error = new Error('Student not found');
    error.statusCode = 404;
    throw error;
  }
  return buildSafeStudent(student);
};

const updateStudent = async (id, payload) => {
  const student = await Student.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).exec();

  if (!student) {
    const error = new Error('Student not found');
    error.statusCode = 404;
    throw error;
  }

  return buildSafeStudent(student);
};

const deleteStudent = async (id) => {
  const student = await Student.findByIdAndDelete(id).exec();
  if (!student) {
    const error = new Error('Student not found');
    error.statusCode = 404;
    throw error;
  }
  return buildSafeStudent(student);
};

module.exports = {
  listStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
};
