const AdmissionApplication = require('./admissions.model');

const listApplications = async () => AdmissionApplication.find().exec();

const createApplication = async (payload) => {
  const existing = await AdmissionApplication.findOne({ applicationNo: payload.applicationNo }).exec();
  if (existing) {
    const error = new Error('Application with this number already exists');
    error.statusCode = 409;
    throw error;
  }

  const application = await AdmissionApplication.create(payload);
  return application;
};

const getApplicationById = async (id) => {
  const application = await AdmissionApplication.findById(id).exec();
  if (!application) {
    const error = new Error('Application not found');
    error.statusCode = 404;
    throw error;
  }
  return application;
};

const updateApplication = async (id, payload) => {
  const application = await AdmissionApplication.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).exec();

  if (!application) {
    const error = new Error('Application not found');
    error.statusCode = 404;
    throw error;
  }

  return application;
};

const deleteApplication = async (id) => {
  const application = await AdmissionApplication.findByIdAndDelete(id).exec();
  if (!application) {
    const error = new Error('Application not found');
    error.statusCode = 404;
    throw error;
  }
  return application;
};

module.exports = {
  listApplications,
  createApplication,
  getApplicationById,
  updateApplication,
  deleteApplication,
};
