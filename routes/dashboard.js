const express = require("express");
const route = express.Router();
const { homepage } = require("../controller/dashboardController");


//the route for the dashboard
route.get("/dashboard", homepage);
module.exports = route;
