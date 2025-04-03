const mongoose = require("mongoose");

const callRecordSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String, required: true },
    callerName: { type: String, required: true },
    company: { type: String, required: true },
    serialNumber: { 
      type: String, 
      required: true, 
      match: /^[0-9]{9}$/, // 9-digit validation
    },
    callTime: { type: Date, required: true },
    reason: { type: String, required: false },
    typeOfService: { type: String, required: false },
    assignedTo: { type: String, required: false },
    tokenNumber: {
      type: String,
      required: false,
      validate: {
        validator: function (value) {
          // Ensure token starts with a date in YYYY-MM-DD format
          return /^\d{4}-\d{2}-\d{2}-/.test(value);
        },
        message: "Token Number must start with a date in YYYY-MM-DD format",
      },
    },
    email: { type: String, required: false }, // New email field
    statusOfCall: { 
      type: String, 
       // Default value set to "Incomplete"
    },
  },
  { timestamps: true }
);

// Pre-save hook to generate tokenNumber if not provided
callRecordSchema.pre("save", function (next) {
  // Check if tokenNumber is already set
  if (!this.tokenNumber) {
    // Ensure callTime is a valid date
    if (!this.callTime) {
      console.error("callTime is not set or invalid.");
      return next(new Error("callTime is required"));
    }
    // Format the callTime to YYYY-MM-DD
    const dateString = this.callTime.toISOString().split('T')[0]; // Get YYYY-MM-DD
    console.log(`Generated date string: ${dateString}`);
    this.tokenNumber = `${dateString}-${this.serialNumber}`; // Concatenate with serial number
    console.log(`Generated tokenNumber: ${this.tokenNumber}`);
  }

  // Continue with save operation
  next();
});

const CallRecord = mongoose.model("CallRecord", callRecordSchema);

module.exports = CallRecord;
