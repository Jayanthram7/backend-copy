const express = require("express");
const CallRecord = require("../models/CallRecord2");

const router = express.Router();

// Add a new call record
router.post("/", async (req, res) => {
  const { 
    phoneNumber, 
    callerName, 
    company, 
    serialNumber, 
    callTime, 
    reason, 
    typeOfService, 
    assignedTo, 
    tokenNumber,
    email,
    statusOfCall = "Incomplete", // Default to "Incomplete" if not provided
  } = req.body;

  try {
    const todayDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
    const prefixedTokenNumber = tokenNumber.startsWith(`${todayDate}-`)
      ? tokenNumber
      : `${todayDate}-${tokenNumber.replace(`${todayDate}-`, "")}`;

    

    const newCallRecord = new CallRecord({
      phoneNumber,
      callerName,
      company,
      serialNumber,
      callTime,
      reason,
      typeOfService,
      assignedTo,
      tokenNumber: prefixedTokenNumber,
      email,
      statusOfCall, // Include statusOfCall here
    });

    await newCallRecord.save();
    res.status(201).json(newCallRecord);
  } catch (error) {
    console.error("Error adding call record:", error);
    res.status(400).json({ message: "Error adding call record", error });
  }
});

// Get all call records with optional filtering
router.get("/", async (req, res) => {
  try {
    const filters = {};

    // Add filters based on query parameters (if any)
    if (req.query.phoneNumber) {
      filters.phoneNumber = new RegExp(req.query.phoneNumber, "i");
    }
    if (req.query.callerName) {
      filters.callerName = new RegExp(req.query.callerName, "i");
    }
    if (req.query.company) {
      filters.company = new RegExp(req.query.company, "i");
    }
    if (req.query.serialNumber) {
      filters.serialNumber = req.query.serialNumber;
    }
    if (req.query.typeOfService) {
      filters.typeOfService = new RegExp(req.query.typeOfService, "i");
    }
    if (req.query.assignedTo) {
      filters.assignedTo = new RegExp(req.query.assignedTo, "i");
    }
    if (req.query.tokenNumber) {
      filters.tokenNumber = new RegExp(req.query.tokenNumber, "i");
    }

    // Add filter for statusOfCall
    if (req.query.statusOfCall) {
      filters.statusOfCall = req.query.statusOfCall;
    }

    // Fetch records
    const callRecords = await CallRecord.find(filters);

    // Sort: "Incomplete" and others first, "Complete" last
    callRecords.sort((a, b) => {
      if (a.statusOfCall === "Complete" && b.statusOfCall !== "Complete") {
        return 1; // Move `a` after `b`
      }
      if (a.statusOfCall !== "Complete" && b.statusOfCall === "Complete") {
        return -1; // Move `a` before `b`
      }
      return 0; // Keep order as is
    });

    res.status(200).json(callRecords);
  } catch (error) {
    console.error("Error retrieving call records:", error);
    res.status(500).json({ message: "Error retrieving call records", error });
  }
});


// Delete a call record by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRecord = await CallRecord.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({ message: "Call record not found" });
    }

    res.status(200).json({ message: "Call record deleted successfully", deletedRecord });
  } catch (error) {
    console.error("Error deleting call record:", error);
    res.status(500).json({ message: "Error deleting call record", error });
  }
});

// Update the assignedTo field for a call record


router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { statusOfCall, assignedTo } = req.body;

  try {
    const updatedFields = {};
    if (statusOfCall !== undefined) updatedFields.statusOfCall = statusOfCall;
    if (assignedTo !== undefined) updatedFields.assignedTo = assignedTo;

    const updatedRecord = await CallRecord.findByIdAndUpdate(
      id,
      updatedFields,
      { new: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({ message: "Call record not found" });
    }

    res.status(200).json({ message: "Record updated successfully", updatedRecord });
  } catch (error) {
    console.error("Error updating record:", error);
    res.status(500).json({ message: "Error updating record", error });
  }
});


module.exports = router;
