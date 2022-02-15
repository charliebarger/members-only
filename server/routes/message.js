var express = require("express");
var router = express.Router();
const messageController = require("../controllers/messageController");
const validation = require("../controllers/validationController");

/* GET create message day.*/
router.get("/", validation.isLoggedIn, messageController.messagePage);

/* GET delete message.*/
router.get("/delete/:id", messageController.deleteMessage);

/* POST new message.*/
router.post(
  "/",
  validation.isLoggedIn,
  messageController.validate(),
  validation.checkValidation,
  messageController.createMessage
);

module.exports = router;
