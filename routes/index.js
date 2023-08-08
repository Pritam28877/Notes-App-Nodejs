const express = require("express");
const route = express.Router();
const { HomepageRender , aboutPage} = require("../controller/mainController");

route.get("/", HomepageRender);
route.get('/about', aboutPage)

module.exports = route;
