const messageDB = require("../models/messages");

exports.retrieveMessages = async (req, res, next) => {
  try {
    const posts = await messageDB
      .find({})
      .sort({ timestamp: "desc" })
      .populate("user");
    res.render("index", { msg: req.flash("msg"), posts });
  } catch (error) {
    next(error);
  }
};
