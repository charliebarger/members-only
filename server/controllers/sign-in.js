const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const passport = require("passport");
const userDB = require("../models/users");
require("../models/database");
var LocalStrategy = require("passport-local").Strategy;
const { check, validationResult } = require("express-validator");
passport.use(
  new LocalStrategy((username, password, done) => {
    userDB.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: "Password or Username is Incorrect",
        });
      }
      try {
        const match = bcrypt.compareSync(password, user.password);
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: "Password or Username is Incorrect",
          });
        }
      } catch (error) {
        return done(err);
      }
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  userDB.findById(id, function (err, user) {
    done(err, user);
  });
});

//validator
exports.validate = (req, res) => {
  return [
    check("username", "username is required").notEmpty().isString(),
    check("password", "password is required").notEmpty().isString(),
  ];
};
