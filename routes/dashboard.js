const express = require("express");
const route = express.Router();
const {
  homepage,
  dashboardViewNotes,
  dashboardupdateNotes,
  dashboardDeleteNote,
} = require("../controller/dashboardController");
const { isLoggedIn } = require("../middleware/cheeckAuth");

//the route for the dashboard
route.get("/dashboard", isLoggedIn, homepage);
route.get("/dashboard/item/:id", isLoggedIn, dashboardViewNotes);
route.put("/dashboard/item/:id", isLoggedIn, dashboardupdateNotes);
route.delete("/dashboard/item-delete/:id",isLoggedIn ,dashboardDeleteNote )

module.exports = route;
