const express = require("express");
const route = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.Client_ID,
      clientSecret: process.env.Client_secret,
      callbackURL: "http://localhost:8000/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);
// Google Login Route
route.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);
// Retrieve user data
route.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login-failure",
    successRedirect: "/dashboard",
  })
);
//error page some thing went worng
route.get("/login-failure", (req, res) => {
  res.send("something went wrong");
});
module.exports = route;
