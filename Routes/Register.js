const express = require("express");
const bcrypt = require("bcryptjs"); // For hashing passwords
const User = require("../models/User");

const router = express.Router();

// POST route for user registration
router.post("/", async (req, res) => {
  const { name, company, serialNumber, email, phone, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      name,
      company,
      serialNumber,
      email,
      phone,
      password: hashedPassword,
    });

    // Save user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
