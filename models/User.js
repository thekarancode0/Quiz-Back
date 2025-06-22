const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  linkedin:String,
  github:String,
  skills:String,
  testsTaken:Number,
  avatar:String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);

