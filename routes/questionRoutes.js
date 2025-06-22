const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

router.get("/questions/:course", (req, res) => {
  const course = req.params.course.toLowerCase();
  const fileName = path.join(__dirname, `../QuestionFiles/${course}questions.json`);

  fs.readFile(fileName, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("Unable to load page!!!");
    }
    res.json(JSON.parse(data));
  });
});

module.exports = router;
