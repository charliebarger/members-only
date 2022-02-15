var express = require("express");
var router = express.Router();
const becomeMember = require("../controllers/memberController");
const validation = require("../controllers/validationController");

/* GET member page. */
router.get("/", validation.isLoggedIn, becomeMember.memberPage);

/* POST new member status. */
router.post(
  "/",
  becomeMember.validate(),
  validation.checkValidation,
  becomeMember.updateMembershipStatus
);

module.exports = router;
