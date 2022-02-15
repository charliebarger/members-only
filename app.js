var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
require("./server/models/database");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");
var indexRouter = require("./server/routes/index");
const adminRouter = require("./server/routes/admin");
const memberRouter = require("./server/routes/member");
const signUpRouter = require("./server/routes/sign-up");
const messageRouter = require("./server/routes/message");
const logInRouter = require("./server/routes/log-in");
const logOutrouter = require("./server/routes/log-out");
const flash = require("express-flash");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//create session with connect-mongo
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  })
);

//passport set up
app.use(passport.initialize());
app.use(passport.session());
require("./server/passport");

//initilaize express-flash
app.use(flash());

// add user to locals
app.use(function (req, res, next) {
  res.locals.user = req.user ? req.user : "";
  next();
});

//routers
app.use("/", indexRouter);
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
