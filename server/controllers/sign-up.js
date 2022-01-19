const userDB = require("../models/users");
require("../models/database");
const { check, validationResult, oneOf } = require("express-validator");

exports.createUser = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    }
    res.redirect("/log-in");
  } catch (error) {
    next(err);
  }
};

exports.validate = (req, res) => {
  return [
    check("username", "username is required")
      .notEmpty()
      .isString()
      .isLength({ min: 5, max: 20 })
      .trim(),
    check("imageUrl").isString().trim().optional({ checkFalsy: true }),
    check("password", "password is required")
      .notEmpty()
      .isLength({ min: 5, max: 20 })
      .custom((value, { req }) => {
        if (value !== req.body.confirmPassword) {
          throw new Error("Password confirmation does not match password");
        }
        return true;
      }),
  ];
};
