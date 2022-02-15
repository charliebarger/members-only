var express = require("express");
var router = express.Router();
const signUp = require("../controllers/sign-up");
const { check, validationResult } = require("express-validator");

/* GET sign-up page. */
router.get("/", function (req, res, next) {
  res.render("sign-up");
});
/* Post new sign up. */
router.post("/", signUp.checkUrl, signUp.validate(), signUp.createUser);

module.exports = router;
