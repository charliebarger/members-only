var express = require("express");
var router = express.Router();
const messageController = require("../controllers/message");
/* GET users listing. */
router.get("/", function (req, res, next) {
  if (req.isAuthenticated()) {
    res.render("create-message", { title: "Express" });
  } else {
    next();
  }
});

router.post("/", messageController.validate(), messageController.createMessage);

router.get("/delete/:id", messageController.deleteMessage);

module.exports = router;
