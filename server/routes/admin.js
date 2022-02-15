var express = require("express");
var router = express.Router();
const becomeAdmin = require("../controllers/adminController");
const validation = require("../controllers/validationController");

/* GET home page. */
router.get("/", validation.isLoggedIn, becomeAdmin.adminPage);

/* POST update admin status */
router.post(
  "/",
  becomeAdmin.validate(),
  validation.checkValidation,
  becomeAdmin.updateAdminStatus
);

module.exports = router;
