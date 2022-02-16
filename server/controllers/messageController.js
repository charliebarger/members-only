const messageDB = require("../models/messages");
const { check } = require("express-validator");

//render message page
exports.messagePage = (req, res, next) => {
  res.render("create-message");
};

//add message to db
exports.createMessage = async (req, res, next) => {
  try {
    const user = await messageDB({
      user: req.user._id,
      title: req.body.messageHeader,
      body: req.body.messageBody,
    });
    await messageDB.create(user);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

//validate messages
exports.validate = () => {
  return [
    check("messageHeader", "title is required")
      .notEmpty()
      .isString()
      .isLength({ max: 25 })
      .trim(),
    check("messageBody", "body is required")
      .notEmpty()
      .isString()
      .isLength({ max: 140 })
      .trim(),
  ];
};

//allow deelting message is the user is an admin
exports.deleteMessage = async (req, res, next) => {
  if (req.user.admin) {
    try {
      await messageDB.findByIdAndDelete(req.params.id);
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
};
