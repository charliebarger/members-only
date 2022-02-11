var express = require("express");
var router = express.Router();
const signUp = require("../controllers/sign-up");
const { check, validationResult } = require("express-validator");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("sign-up", { title: "Express" });
});

const randomAvatars = () => {
  const images = [
    "http://images6.fanpop.com/image/photos/40800000/soda-me-broda-me-regular-show-xxl-40805603-842-473.png",
    "https://static.wikia.nocookie.net/chrislilley/images/0/02/648386-chris-lilley.jpg/revision/latest/scale-to-width-down/300?cb=20140114212209",
    "https://metro.co.uk/wp-content/uploads/2018/05/sei_14554950.jpg?quality=90&strip=all",
    "https://m.media-amazon.com/images/M/MV5BMjE1NjMyNTM3OF5BMl5BanBnXkFtZTgwMzY1NDEzMjE@._V1_.jpg",
    "https://i.ytimg.com/vi/xUBthxxEHyM/maxresdefault.jpg",
    "https://i.pinimg.com/originals/d8/05/1c/d8051cbf4333197b3aa715039869c4fb.jpg",
  ];
  return images[Math.floor(Math.random() * images.length)];
};

router.post(
  "/",
  (req, res, next) => {
    if (req.body.imageUrl == "") {
      req.body.imageUrl = randomAvatars();
    }
    console.log(req.body);
    next();
  },
  signUp.validate(),
  signUp.createUser
);

module.exports = router;
