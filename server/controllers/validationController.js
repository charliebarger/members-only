const { validationResult } = require("express-validator");

//check to make sure no errors from express validator
exports.checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array());
  }
  next();
};

//check if user is logged in
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    next(new Error("not logged in"));
  }
};
