var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  if (req.user) {
    res.render("create-message", { title: "Express" });
  }
  next();
});

module.exports = router;
