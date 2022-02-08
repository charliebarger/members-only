var express = require("express");
var router = express.Router();
require("../controllers/sign-in");
const passport = require("passport");
/* GET users listing. */

router.get("/", function (req, res, next) {
  if (req.isAuthenticated()) {
    console.log("hello");
  }
  res.render("log-in", { user: "" });
});

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in?error=true",
  })
);

module.exports = router;
