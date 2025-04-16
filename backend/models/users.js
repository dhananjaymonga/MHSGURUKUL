const mongoose = require('mongoose');

// Define the schema for uploaded data
const uploadedDataSchema = new mongoose.Schema({
  class: String,
  subject: String,
  title: String,
  pdfUrl: String,
});

// Create a model based on the schema
const UploadedData = mongoose.model('UploadedData', uploadedDataSchema);

module.exports = UploadedData;