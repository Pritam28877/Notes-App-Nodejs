const express = require("express");
const route = express.Router();
const { homepage } = require("../controller/dashboardController");
const {isLoggedIn} = require('../middleware/cheeckAuth')


//the route for the dashboard
route.get("/dashboard",isLoggedIn , homepage);
module.exports = route;
