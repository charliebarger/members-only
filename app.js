var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
require("./server/models/database");
const session = require("express-session");
const passport = require("passport");
var indexRouter = require("./server/routes/index");
var usersRouter = require("./server/routes/users");
const adminRouter = require("./server/routes/admin");
const memberRouter = require("./server/routes/member");
const signUpRouter = require("./server/routes/sign-up");
const messageRouter = require("./server/routes/message");
const logInRouter = require("./server/routes/log-in");
const logOutrouter = require("./server/routes/log-out");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//create session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

//passport
app.use(passport.initialize());
app.use(passport.session());

//check for log in

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);
app.use("/member", memberRouter);
app.use("/sign-up", signUpRouter);
app.use("/log-in", logInRouter);
app.use("/message", messageRouter);
app.use("/log-out", logOutrouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
