const { AcademicYear, Class, Subject } = require('./academics.model');

// Academic Years
const listAcademicYears = async () => AcademicYear.find().exec();

const createAcademicYear = async (payload) => AcademicYear.create(payload);

const getAcademicYearById = async (id) => {
  const year = await AcademicYear.findById(id).exec();
  if (!year) {
    const error = new Error('Academic year not found');
    error.statusCode = 404;
    throw error;
  }
  return year;
};

const updateAcademicYear = async (id, payload) => {
  const year = await AcademicYear.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).exec();
  if (!year) {
    const error = new Error('Academic year not found');
    error.statusCode = 404;
    throw error;
  }
  return year;
};

const deleteAcademicYear = async (id) => {
  const year = await AcademicYear.findByIdAndDelete(id).exec();
  if (!year) {
    const error = new Error('Academic year not found');
    error.statusCode = 404;
    throw error;
  }
  return year;
};

// Classes
const listClasses = async () => Class.find().exec();

const createClass = async (payload) => Class.create(payload);

const getClassById = async (id) => {
  const cls = await Class.findById(id).exec();
  if (!cls) {
    const error = new Error('Class not found');
    error.statusCode = 404;
    throw error;
  }
  return cls;
};

const updateClass = async (id, payload) => {
  const cls = await Class.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).exec();
  if (!cls) {
    const error = new Error('Class not found');
    error.statusCode = 404;
    throw error;
  }
  return cls;
};

const deleteClass = async (id) => {
  const cls = await Class.findByIdAndDelete(id).exec();
  if (!cls) {
    const error = new Error('Class not found');
    error.statusCode = 404;
    throw error;
  }
  return cls;
};

// Subjects
const listSubjects = async () => Subject.find().exec();

const createSubject = async (payload) => Subject.create(payload);

const getSubjectById = async (id) => {
  const subject = await Subject.findById(id).exec();
  if (!subject) {
    const error = new Error('Subject not found');
    error.statusCode = 404;
    throw error;
  }
  return subject;
};

const updateSubject = async (id, payload) => {
  const subject = await Subject.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).exec();
  if (!subject) {
    const error = new Error('Subject not found');
    error.statusCode = 404;
    throw error;
  }
  return subject;
};

const deleteSubject = async (id) => {
  const subject = await Subject.findByIdAndDelete(id).exec();
  if (!subject) {
    const error = new Error('Subject not found');
    error.statusCode = 404;
    throw error;
  }
  return subject;
};

module.exports = {
  listAcademicYears,
  createAcademicYear,
  getAcademicYearById,
  updateAcademicYear,
  deleteAcademicYear,

  listClasses,
  createClass,
  getClassById,
  updateClass,
  deleteClass,

  listSubjects,
  createSubject,
  getSubjectById,
  updateSubject,
  deleteSubject,
};
