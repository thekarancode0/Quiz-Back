const express = require("express");
const multer = require("multer");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth"); // JWT middleware

const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET user by logged-in ID
router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
});


// POST update user
router.post("/user/update", auth, upload.single("avatar"), async (req, res) => {
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

    if (avatar) {
      const mimeType = req.file.mimetype || "image/png";
      updateData.avatar = `data:${mimeType};base64,${avatar}`;
    }

    const user = await User.findByIdAndUpdate(req.user.id, updateData, {
      new: true,
    });

    res.json(user);
  } catch (err) {
    console.error(err);
    console.log(storage);
    res.status(500).json({ message: "Update failed" });
  }
});

module.exports = router;
