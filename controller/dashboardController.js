const Note = require('../models/Notes')

module.exports.homepage = async (req, res) => {  
  const locals = {
    title: "Dashboard",
    description: " Free Node js notes apps ",
  };
  res.render("dashboard/index", {
    userName: req.user.firstName,
    locals,
    layout: "../views/layout/dashboard",
  });
};
