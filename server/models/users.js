const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: "this field is required",
    maxlength: 20,
  },
  avatarURL: {
    type: String,
    required: "this field is required",
  },
  password: {
    type: String,
    required: "this field is required",
    maxlength: 20,
  },
});

module.exports = mongoose.model("user", userSchema);
