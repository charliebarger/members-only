var express = require("express");
var router = express.Router();
const signUp = require("../controllers/signUpController");
const validation = require("../controllers/validationController");

/* GET sign-up page. */
router.get("/", function (req, res, next) {
  res.render("sign-up");
});

/* POST new sign up. */
router.post(
  "/",
  signUp.checkUrl,
  signUp.validate(),
  validation.checkValidation,
  signUp.createUser
);

module.exports = router;
