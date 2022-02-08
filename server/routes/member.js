var express = require("express");
var router = express.Router();
const becomeMember = require("../controllers/becomeMember");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("member-log-in");
});

router.post("/", becomeMember.updateMembershipStatus);

module.exports = router;
