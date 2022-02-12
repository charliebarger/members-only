var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { msg: req.flash("msg") });
});

module.exports = router;
