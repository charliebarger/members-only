var express = require("express");
var router = express.Router();
require("../controllers/sign-in");
const passport = require("passport");
/* GET users listing. */

router.get("/", function (req, res, next) {
  if (req.isAuthenticated()) {
    console.log(req.user);
  }
  res.render("log-in");
});

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in?error=true",
  })
);

module.exports = router;
