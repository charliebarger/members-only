const userDB = require("../models/users");
const ObjectId = require("mongodb").ObjectId;
const { check } = require("express-validator");

exports.updateAdminStatus = async (req, res, next) => {
  try {
    if (req.body.admin === process.env.ADMIN_PASSWORD) {
      await userDB.findByIdAndUpdate(ObjectId(req.user._id), {
        $set: { admin: true },
      });
      req.user.admin = true;
      res.redirect("/");
    } else {
      req.flash("msg", "Wrong Password");
      res.redirect("/admin");
    }
  } catch (error) {
    next(error);
  }
};

exports.validate = (req, res) => {
  return check("admin", "answer is required").notEmpty().isString();
};

exports.adminPage = (req, res, next) => {
  res.render("admin-log-in", { msg: req.flash("msg") });
};
