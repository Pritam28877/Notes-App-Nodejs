const express = require("express");
const route = express.Router();
const { dashboardController } = require("../controller/dashboardController");
route.get("/dash");
module.exports = route;
