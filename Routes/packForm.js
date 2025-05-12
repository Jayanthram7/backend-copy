// routes/packForm.js
const express = require('express');
const router = express.Router();
const PackForm = require('../models/PackForm'); // Mongoose model

// POST /api/pack-form
router.post("/", async (req, res) => {
    try {
      const {
        recordId,
        companyName,
        flavour,
        serialNo,
        email,
        name,
        mobileNo,
        gst,
        timePeriod
      } = req.body;
  
      console.log("Received data:", req.body); // 👈 Debug log
  
      const saved = await PackForm.findOneAndUpdate(
        { recordId },
        {
          companyName,
          flavour,
          serialNo,
          email,
          name,
          mobileNo,
          gst,
          timePeriod
        },
        { new: true, upsert: true }
      );
      

  
      res.status(200).json(saved);
    } catch (error) {
      console.error("Error saving form:", error); // 👈 Print full error
      res.status(500).json({ message: "Server error" });
    }
  });
  // GET /api/pack-form/:id
router.get("/:id", async (req, res) => {
    try {
      const recordId = req.params.id;
  
      const existing = await PackForm.findOne({ recordId });
  
      if (!existing) {
        return res.status(404).json({ message: "Not found" });
      }
  
      res.json(existing);
    } catch (err) {
      console.error("Error fetching form data:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  

module.exports = router;
