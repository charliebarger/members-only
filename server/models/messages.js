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
    default: Date.now,
    required: "this field is required",
  },
});

messageSchema.virtual("date").get(function () {
  return DateTime.fromJSDate(this.timestamp)
    .toLocaleString(DateTime.DATETIME_SHORT)
    .replace(",", " |");
});

module.exports = mongoose.model("message", messageSchema);
