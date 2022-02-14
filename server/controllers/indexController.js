const messageDB = require("../models/messages");
require("../models/database");

exports.retrieveMessages = async (req, res, next) => {
  try {
    const posts = await messageDB
      .find({})
      .sort({ timestamp: "desc" })
      .populate("user");

    res.render("index", { msg: req.flash("msg"), posts: posts });
  } catch (error) {
    console.log(error);
    next();
  }
};
