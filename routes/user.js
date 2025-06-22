// routes/user.js
const express = require("express");
const multer = require("multer");
const router = express.Router();
const User = require("../models/User");

// Setup multer for image upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET: Fetch user (use your own auth if needed)
router.get("/api/user", upload.single("avatar"),async (req, res) => {
  try {
    const user = await User.findOne(); // Fetch current user
     const avatar = req.file ? req.file.buffer.toString("base64") : undefined;

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
});

// POST: Update user profile
router.post("/api/user/update", async (req, res) => {
  try {
    const { name, email, linkedin, github, skills, testsTaken } = req.body;
    console.log("OKKK")

    const updateData = {
      fname,
      email,
      linkedin,
      github,
      skills,
      testsTaken: parseInt(testsTaken || 0),
    };



    const user = await User.findOneAndUpdate({}, updateData, {
      new: true,
      upsert: true,
    });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
});

module.exports = router;
