const userDB = require("../models/users");
require("../models/database");
const ObjectId = require("mongodb").ObjectId;
const { check, validationResult } = require("express-validator");

exports.updateMembershipStatus = async (req, res, next) => {
  try {
    if (req.body.member.toLowerCase() === process.env.memberPassword) {
      await userDB.findByIdAndUpdate(ObjectId(req.user._id), {
        $set: { member: true },
      });
      req.user.member = true;
      res.redirect("/");
    } else {
      res.redirect("/member");
      console.log("didnt match");
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
