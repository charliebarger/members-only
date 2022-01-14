const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: "this field is required",
  },
  lastName: {
    type: String,
    required: "this field is required",
  },
  avatar: {
    type: String,
    required: "this field is required",
  },
  username: {
    type: String,
    required: "this field is required",
    maxlength: 20,
  },
  password: {
    type: String,
    required: "this field is required",
    maxlength: 20,
  },
});

module.exports = mongoose.model("user", userSchema);
