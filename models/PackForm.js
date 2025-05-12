// models/PackForm.js
const mongoose = require('mongoose');

const packFormSchema = new mongoose.Schema({
  companyName: String,
  flavour: String,
  serialNo: String,
  email: String,
  name: String,
  mobileNo: String,
  gst: String,
  timePeriod: String,
}, { timestamps: true });

module.exports = mongoose.model('PackForm', packFormSchema);
