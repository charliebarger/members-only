var express = require("express");
var router = express.Router();
const signIn = require("../controllers/sign-in");
const passport = require("passport");
/* GET users listing. */

router.get("/", function (req, res, next) {
  if (req.isAuthenticated()) {
    console.log("partygoi");
  }
  res.render("log-in");
});

router.post(
  "/",
  signIn.validate(),
  passport.authenticate("local", {
    failureFlash: true,
    successRedirect: "/",
    failureRedirect: "/log-in",
  })
);

module.exports = router;
