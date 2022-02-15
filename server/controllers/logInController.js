const bcrypt = require("bcrypt");
const passport = require("passport");
const userDB = require("../models/users");
var LocalStrategy = require("passport-local").Strategy;
const { check, validationResult } = require("express-validator");

//authenticate
exports.authenticate = (req, res) => {
  return passport.authenticate("local", {
    failureFlash: true,
    successFlash: {
      type: "success",
      message: "Successfully signed up.",
    },
    successRedirect: "/",
    failureRedirect: "/log-in",
  });
};

//validator
exports.validate = () => {
  return [
    check("username", "username is required").notEmpty().isString(),
    check("password", "password is required").notEmpty().isString(),
  ];
};

exports.logInPage = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.render("log-in");
  }
};
