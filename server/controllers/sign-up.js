const userDB = require("../models/users");
require("../models/database");
const { check, validationResult } = require("express-validator");

exports.createUser = (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array());
  }
  res.redirect("/");
};

exports.validate = async (req, res, next) => {
  console.log("hiiiiiii");
  return [check("username").notEmpty().trim(), check("password").notEmpty()];
  next();
};
