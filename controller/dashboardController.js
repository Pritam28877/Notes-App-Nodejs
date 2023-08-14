const Note = require('../models/Notes')

module.exports.homepage = async (req, res) => {  
  const locals = {
    title: "Dashboard",
    description: " Free Node js notes apps ",
  };

  try {
    const notes = await Note.find({});
    res.render("dashboard/index", {
      userName: req.user.firstName,
      notes,
      locals,
      layout: "../views/layout/dashboard",
    });
  } catch (error) {
    
  }
 
};
