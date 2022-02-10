const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.on("error", () => console.log("connection error"));

connection.on("open", () => console.log("connected"));

exports.connection = connection;
