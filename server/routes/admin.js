var express = require("express");
var router = express.Router();
const becomeAdmin = require("../controllers/becomeAdmin");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("admin-log-in", { title: "Express" });
});

router.post("/", becomeAdmin.updateAdminStatus);

module.exports = router;
