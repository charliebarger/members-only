const messageDB = require("../models/messages");
require("../models/database");
const ObjectId = require("mongodb").ObjectId;
const { check, validationResult } = require("express-validator");

exports.createMessage = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    }
    const user = await messageDB({
      user: req.user._id,
      title: req.body.messageHeader,
      body: req.body.messageBody,
    });
    await messageDB.create(user);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

exports.validate = (req, res) => {
  console.log("reached");
  return [
    check("messageHeader", "title is required").notEmpty().isString().trim(),
    check("messageBody", "body is required").notEmpty().isString().trim(),
  ];
};
