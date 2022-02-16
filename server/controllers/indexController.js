const messageDB = require("../models/messages");

exports.retrieveMessages = async (req, res, next) => {
  try {
    if (req.user) {
      const posts = await messageDB.find({}).sort().populate("user");
      res.render("index", { msg: req.flash("msg"), posts });
    } else {
      res.render("index", { msg: "", posts: "" });
    }
  } catch (error) {
    next(error);
  }
};
