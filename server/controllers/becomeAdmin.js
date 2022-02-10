const userDB = require("../models/users");
require("../models/database");
const ObjectId = require("mongodb").ObjectId;
const { check, validationResult } = require("express-validator");

exports.updateAdminStatus = async (req, res, next) => {
  try {
    console.log("hereee");
    if (req.body.admin === process.env.adminPassword) {
      await userDB.findByIdAndUpdate(ObjectId(req.user._id), {
        $set: { admin: true },
      });
      req.user.admin = true;
      res.redirect("/");
    } else {
      res.redirect("/admin");
      console.log("didnt match");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.validate = (req, res) => {
  return check("admin", "answer is required").notEmpty().isString();
};
