var express = require("express");
var router = express.Router();
const signUp = require("../controllers/sign-up");
const { check, validationResult } = require("express-validator");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("sign-up", { title: "Express" });
});

router.use(signUp.validate);
router.post("/", signUp.createUser);

module.exports = router;
