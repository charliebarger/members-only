const userDB = require("../models/users");
require("../models/database");
const ObjectId = require("mongodb").ObjectId;
const { check, validationResult } = require("express-validator");

exports.updateMembershipStatus = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).jsonp(errors.array());
    }
    if (req.body.member === process.env.memberPassword) {
      await userDB.findByIdAndUpdate(ObjectId(req.user._id), {
        $set: { member: true },
      });
      req.user.member = true;
      res.redirect("/");
    } else {
      req.flash("msg", "Wrong Password");
      res.redirect("/member");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.validate = (req, res) => {
  return [
    check("member", "answer is required").notEmpty().isString().toLowerCase(),
  ];
};
