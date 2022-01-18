const userDB = require("../models/users");
require("../models/database");
const { check, validationResult } = require("express-validator");

exports.createUser = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    }
    console.log("good");
  } catch (error) {
    next(err);
  }
};

exports.validate = (req, res) => {
  return [
    check("username", "username is required")
      .notEmpty()
      .isLength({ min: 5, max: 20 })
      .trim(),
    check("image-url").isDataURI().trim().optional(),

    check("password")
      .notEmpty()
      .isLength({ min: 5, max: 20 })
      .custom({ nullable: true }),
  ];
};
