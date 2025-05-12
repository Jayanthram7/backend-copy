// routes/packForm.js
const express = require('express');
const router = express.Router();
const PackForm = require('../models/PackForm'); // Mongoose model

// POST /api/pack-form
router.post('/', async (req, res) => {
  const { recordId, companyName, flavour, serialNo, email, name, mobileNo, gst, timePeriod } = req.body;

  try {
    if (recordId) {
      // Update existing record
      const updated = await PackForm.findByIdAndUpdate(recordId, {
        companyName, flavour, serialNo, email, name, mobileNo, gst, timePeriod
      }, { new: true });

      if (!updated) return res.status(404).json({ message: "Record not found" });
      return res.status(200).json({ message: "Updated", data: updated });
    } else {
      // Create new record
      const newPack = new PackForm({ companyName, flavour, serialNo, email, name, mobileNo, gst, timePeriod });
      await newPack.save();
      return res.status(201).json({ message: "Created", data: newPack });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
