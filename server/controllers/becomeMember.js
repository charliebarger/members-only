const userDB = require("../models/users");
require("../models/database");
const ObjectId = require("mongodb").ObjectId;

exports.updateMembershipStatus = async (req, res, next) => {
  try {
    if (req.body.member === process.env.memberPassword) {
      await userDB.findByIdAndUpdate(ObjectId(req.user._id), {
        $set: { member: true },
      });
      req.user.member = true;
      res.redirect("/");
    } else {
      console.log("didnt match");
    }
  } catch (error) {
    console.log(error);
  }
};
