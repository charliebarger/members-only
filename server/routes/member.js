var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("member-log-in");
});

module.exports = router;
