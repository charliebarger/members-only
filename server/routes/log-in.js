var express = require("express");
var router = express.Router();
const logIn = require("../controllers/logInController");
const validation = require("../controllers/validationController");

/* GET log in page. */
router.get("/", logIn.logInPage);

/* POST log in user */
router.post(
  "/",
  logIn.validate(),
  validation.checkValidation,
  logIn.authenticate()
);

module.exports = router;
