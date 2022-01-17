var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("memberLogin", { title: "Express" });
});

module.exports = router;
