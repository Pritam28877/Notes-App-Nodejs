require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const port = 8000 || process.env.Port;
const homePage = require("./routes/index");
const dashBoard = require("./routes/dashboard");
const auth = require('./routes/auth')
const Db = require("./config/mongoose");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");

//middelware dependency
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//static file
app.use(express.static("public"));

// Templating Engine
app.use(expressLayouts);
app.set("layout", "./layout/main");
app.set("view engine", "ejs");

// route of the app
app.use("/", homePage);
app.use("/", dashBoard);
app.get("*", (req, res) => {
  res.status(404).render("404");
});
// the app port output
app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`app is running port ${port}`);
});
