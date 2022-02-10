var express = require("express");
var router = express.Router();
const becomeAdmin = require("../controllers/becomeAdmin");
/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.user) {
    res.render("admin-log-in", { title: "Express" });
  } else {
    next();
  }
});

router.post("/", becomeAdmin.validate(), becomeAdmin.updateAdminStatus);

module.exports = router;
