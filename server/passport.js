const bcrypt = require("bcrypt");
const passport = require("passport");
const userDB = require("./models/users");
var LocalStrategy = require("passport-local").Strategy;

//add local strategy
passport.use(
  new LocalStrategy((username, password, done) => {
    userDB.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: "Password or Username is Incorrect",
        });
      }
      try {
        const match = bcrypt.compareSync(password, user.password);
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: "Password or Username is Incorrect",
          });
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
