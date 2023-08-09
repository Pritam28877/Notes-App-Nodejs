const express = require("express");
const route = express.Router();
const { homepage } = require("../controller/dashboardController");
route.get("/dashboard",homepage);
module.exports = route;
