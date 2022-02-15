var express = require("express");
var router = express.Router();
const messages = require("../controllers/indexController");

/* GET home page. */
router.get("/", messages.retrieveMessages);

module.exports = router;
