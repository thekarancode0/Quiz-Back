const express = require("express");
const router = express.Router();
const { register, login,karan } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get('/karan',karan)
module.exports = router;