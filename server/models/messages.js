const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
    required: "this field is required",
  },
  title: {
    type: String,
    required: "this field is required",
  },
  body: {
    type: String,
    required: "this field is required",
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: "this field is required",
  },
});

module.exports = mongoose.model("Message", messageSchema);
