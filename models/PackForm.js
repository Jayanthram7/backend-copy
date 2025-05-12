const mongoose = require("mongoose");

const packFormSchema = new mongoose.Schema({
  recordId: { type: String, required: true },
  companyName: String,
  flavour: String,
  serialNo: String,
  email: String,
  name: String,
  mobileNo: String,
  gst: String,
  timePeriod: String,
});

module.exports = mongoose.model("PackForm", packFormSchema);
