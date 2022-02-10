var express = require("express");
var router = express.Router();
const becomeAdmin = require("../controllers/becomeAdmin");
/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.isAuthenticated()) {
    res.render("admin-log-in", { msg: req.flash("msg") });
  } else {
    next();
  }
});

router.post("/", becomeAdmin.validate(), becomeAdmin.updateAdminStatus);

module.exports = router;
