const express = require("express");
const route = express.Router();
const {
  homepage,
  dashboardViewNotes,
  dashboardupdateNotes,
} = require("../controller/dashboardController");
const { isLoggedIn } = require("../middleware/cheeckAuth");

//the route for the dashboard
route.get("/dashboard", isLoggedIn, homepage);
route.get("/dashboard/items/:id", isLoggedIn, dashboardViewNotes);
route.post("/dashboard/items/:id", isLoggedIn, dashboardupdateNotes);

module.exports = route;
