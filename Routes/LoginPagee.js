const express = require("express");
const bcrypt = require("bcryptjs"); // For comparing hashed passwords
const User = require("../models/User"); // Your User model

const router = express.Router();

// POST route for user login
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the entered password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Successful login
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
