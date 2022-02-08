const bcrypt = require("bcrypt");
const passport = require("passport");
const userDB = require("../models/users");
require("../models/database");
var LocalStrategy = require("passport-local").Strategy;
passport.use(
  new LocalStrategy((username, password, done) => {
    userDB.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      try {
        const match = bcrypt.compareSync(password, user.password);
        if (match) {
          console.log(user);
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password" });
        }
      } catch (error) {
        return done(err);
      }
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  userDB.findById(id, function (err, user) {
    done(err, user);
  });
});
