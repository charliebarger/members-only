var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  if (req.isAuthenticated()) {
    res.render("create-message", { title: "Express" });
  } else {
    next();
  }
});

module.exports = router;
