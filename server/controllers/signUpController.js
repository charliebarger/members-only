const userDB = require("../models/users");
const { check } = require("express-validator");

const checkUsernameAvailability = async (req, res, next) => {
  const usernameUnavailable = await userDB.exists({
    username: req.body.username,
  });
  if (usernameUnavailable) {
    req.flash("msg", "Username is Not Available");
    req.flash("url", req.body.imageUrl);
    res.redirect("/sign-up");
  }
  next();
};

const checkPasswordLength = async (req, res, next) => {
  if (req.body.password.length > 20 || req.body.password.length < 5) {
    req.flash("msg", "Password must be between 5 and 20 characters");
    req.flash("username", req.body.username);
    req.flash("url", req.body.imageUrl);
    res.redirect("/sign-up");
  }
  next();
};

const checkUsernameLength = async (req, res, next) => {
  if (req.body.username.length > 20 || req.body.username.length < 5) {
    req.flash("msg", "Username must be between 5 and 20 characters");
    req.flash("url", req.body.imageUrl);
    res.redirect("/sign-up");
  }
  next();
};

const checkConfirmPassword = async (req, res, next) => {
  if (req.body.password != req.body.confirmPassword) {
    req.flash("username", req.body.username);
    req.flash("msg", "Passwords do not match");
    req.flash("url", req.body.imageUrl);
    res.redirect("/sign-up");
  }
  next();
};

//checks to make sure the image url is valid, if not assigns a random avatar
const checkUrl = (req, res, next) => {
  if (req.body.imageUrl == "") {
    req.body.imageUrl = randomAvatars();
  }
  next();
};

const checkImg = (req, res, next) => {
  const image = req.body.imageUrl.match(/(jpeg|jpg|gif|png)/) != null;
  if (image) {
    next();
  } else {
    req.flash("username", req.body.username);
    req.flash("msg", "Image URL is not valid");
    res.redirect("/sign-up");
  }
};

exports.checkFormValidity = [
  checkUsernameAvailability,
  checkPasswordLength,
  checkConfirmPassword,
  checkUsernameLength,
  checkUrl,
  checkImg,
];

//create a new user
exports.createUser = async (req, res, next) => {
  try {
    const user = await userDB({
      username: req.body.username,
      avatarURL: req.body.imageUrl,
      password: req.body.password,
    });
    await userDB.create(user);
    res.redirect("/log-in");
  } catch (error) {
    next(error);
  }
};

//user validation
exports.validate = (req, res) => {
  return [
    check("username", "username is required")
      .notEmpty()
      .isString()
      .isLength({ min: 5, max: 20 })
      .trim(),
    check("imageUrl").exists().isString().trim(),
    check("password", "password is required")
      .notEmpty()
      .isLength({ min: 5, max: 20 })
      .custom((value, { req }) => {
        if (value !== req.body.confirmPassword) {
          throw new Error("Password confirmation does not match password");
        }
        return true;
      }),
    check("member").isBoolean().optional({ checkFalsy: true }),
    check("admin").isBoolean().optional({ checkFalsy: true }),
  ];
};

//function that returns a random avatar photo from a list of avatar photos
const randomAvatars = () => {
  const images = [
    "http://images6.fanpop.com/image/photos/40800000/soda-me-broda-me-regular-show-xxl-40805603-842-473.png",
    "http://tvline.com/wp-content/uploads/2011/12/5-300111230173120.jpg",
    "https://metro.co.uk/wp-content/uploads/2018/05/sei_14554950.jpg?quality=90&strip=all",
    "https://m.media-amazon.com/images/M/MV5BMjE1NjMyNTM3OF5BMl5BanBnXkFtZTgwMzY1NDEzMjE@._V1_.jpg",
    "https://i.ytimg.com/vi/xUBthxxEHyM/maxresdefault.jpg",
    "https://i.pinimg.com/originals/d8/05/1c/d8051cbf4333197b3aa715039869c4fb.jpg",
  ];
  return images[Math.floor(Math.random() * images.length)];
};
