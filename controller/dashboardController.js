const { default: mongoose } = require("mongoose");
const Note = require("../models/Notes");

module.exports.homepage = async (req, res) => {
  let perPage = 12;
  let page = req.query.page || 1;
  const locals = {
    title: "Dashboard",
    description: " Free Node js notes apps ",
  };

  try {
    const Note = await Note.aggregate([
      { $sort: { updatedAt: -1 } },
      { $match: { user: mongoose.Types.ObjectId(req.user.id) } },
      {
        $project: {
          title: { $substr: ["$title", 0, 30] },
          body: { $substr: ["$body", 0, 100] },
        },
      }
      ])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec(); 


    const notes = await Note.find({});
    res.render("dashboard/index", {
      userName: req.user.firstName,
      notes,
      locals,
      layout: "../views/layout/dashboard",
    });
  } catch (error) {}
};
