// routes/user.js
const express = require("express");
const multer = require("multer");
const router = express.Router();
const User = require("../models/User");

// Setup multer for image upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET: Fetch user
router.get("/user", async (req, res) => {
  try {
    const user = await User.findOne();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
});

// POST: Update user profile with avatar
router.post("/user/update", upload.single("avatar"), async (req, res) => {
  try {
    const { fname, email, linkedin, github, skills, testsTaken } = req.body;
    const avatar = req.file ? req.file.buffer.toString("base64") : undefined;

    const updateData = {
      fname,
      email,
      linkedin,
      github,
      skills,
      testsTaken: parseInt(testsTaken || 0),
    };

    if (avatar) updateData.avatar = `data:image/png;base64,${avatar}`;

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
