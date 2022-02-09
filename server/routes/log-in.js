var express = require("express");
var router = express.Router();
require("../controllers/sign-in");
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
  passport.authenticate("local", {
    failureFlash: true,
    successRedirect: "/",
    failureRedirect: "/log-in",
  })
);

module.exports = router;
