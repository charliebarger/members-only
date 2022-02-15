const userDB = require("../models/users");
require("../models/database");
const ObjectId = require("mongodb").ObjectId;
const { check, validationResult } = require("express-validator");

//render member page
exports.memberPage = (req, res, next) => {
  res.render("member-log-in", { msg: req.flash("msg") });
};

exports.updateMembershipStatus = async (req, res, next) => {
  try {
    if (req.body.member === process.env.memberPassword) {
      await userDB.findByIdAndUpdate(ObjectId(req.user._id), {
        $set: { member: true },
      });
      req.user.member = true;
      req.flash("msg", "Congrats Member!");
      res.redirect("/");
    } else {
      req.flash("msg", "Wrong Password");
      res.redirect("/member");
    }
  } catch (error) {
    next(error);
  }
};

//validate member status
exports.validate = (req, res) => {
  return [
    check("member", "answer is required").notEmpty().isString().toLowerCase(),
  ];
};
