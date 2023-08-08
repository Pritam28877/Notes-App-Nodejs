const express = require("express");
const route = express.Router();
const { HomepageRender } = require('../controller/mainController')



route.get('/', HomepageRender);

module.exports = route;