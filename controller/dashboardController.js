const Note = require('../models/Notes');

module.exports.homepage = async (req, res) => {
  const perPage = 12;
  const page = req.query.page || 1;

  const locals = {
    title: "Dashboard",
    description: "Free Node js notes apps",
  };

  try {
    const totalNotesCount = await Note.countDocuments({});
    const totalPages = Math.ceil(totalNotesCount / perPage);

    const notes = await Note.aggregate([
      { $sort: { updatedAt: -1 } },
      {
        $project: {
          title: { $substr: ["$title", 0, 30] },
          body: { $substr: ["$body", 0, 100] },
        },
      },
    ])
      .skip(perPage * (page - 1))
      .limit(perPage);

    res.render("dashboard/index", {
      userName: req.user.firstName,
      notes,
      locals,
      layout: "../views/layout/dashboard",
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
  }
};
