var express = require("express");
var router = express.Router();
const becomeMember = require("../controllers/becomeMember");
/* GET users listing. */
router.get("/", function (req, res, next) {
  console.log("here");
  if (req.isAuthenticated()) {
    res.render("member-log-in", { msg: req.flash("msg") });
  } else {
    next();
  }
});

router.post("/", becomeMember.validate(), becomeMember.updateMembershipStatus);

module.exports = router;
