const mongoose = require("mongoose");
const { DateTime } = require("luxon");
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
    default: DateTime.now(),
    required: "this field is required",
  },
});

DateTime.now().toLocaleString(DateTime.DATETIME_FULL);

messageSchema.virtual("date").get(function () {
  return this.timestamp
    .toLocaleString(DateTime.DATETIME_SHORT)
    .replace(",", " |");
});

module.exports = mongoose.model("message", messageSchema);
