const express = require("express");
const route = express.Router();
const {
  homepage,
  dashboardViewNotes,
  dashboardupdateNotes,
  dashboardDeleteNote,
  dashboardAddNote,
  dashboardAddNoteSubmit,
  dashboardSearch,
  dashboardSearchSubmit
} = require("../controller/dashboardController");
const { isLoggedIn } = require("../middleware/cheeckAuth");

//the route for the dashboard
route.get("/dashboard", isLoggedIn, homepage);
route.get("/dashboard/item/:id", isLoggedIn, dashboardViewNotes);
route.put("/dashboard/item/:id", isLoggedIn, dashboardupdateNotes);
route.delete("/dashboard/item-delete/:id", isLoggedIn, dashboardDeleteNote);
route.get("/dashboard/add", isLoggedIn, dashboardAddNote);
route.post("/dashboard/add", isLoggedIn, dashboardAddNoteSubmit);
route.get('/dashboard/search', isLoggedIn, dashboardSearch);
route.post('/dashboard/search', isLoggedIn, dashboardSearchSubmit);
module.exports = route;