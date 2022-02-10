var express = require("express");
var router = express.Router();
const becomeMember = require("../controllers/becomeMember");
/* GET users listing. */
router.get("/", function (req, res, next) {
  if (req.user) {
    res.render("member-log-in");
  }
});

router.post("/", becomeMember.validate(), becomeMember.updateMembershipStatus);

module.exports = router;
