const Note = require("../models/Notes");
const { ObjectId } = require("mongodb");

module.exports.homepage = async (req, res) => {
  const perPage = 12;
  const page = req.query.page || 1;

  const locals = {
    title: "Dashboard",
    description: "Free Node js notes apps",
  };

  try {
    const totalNotesCount = await Note.countDocuments({ user: req.user.id });
    const pages = Math.ceil(totalNotesCount / perPage);

    const user = req.user.id;
    const notes = await Note.aggregate([
      { $sort: { updatedAt: -1 } },
      { $match: { user: new ObjectId(user) } }, // Use the ObjectId instance
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
      current: page,
      pages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
  }
};
/**
 * GET /
 * View Specific Note
 */
module.exports.dashboardViewNotes = async (req, res) => {
  const note = await Note.findById({ _id: req.params.id })
    .where({ user: req.user.id })
    .lean();

  if (note) {
    res.render("dashboard/view-note", {
      noteID: req.params.id,
      note,
      layout: "../views/layout/dashboard",
    });
  } else {
    res.send("Something went wrong.");
  }
};
/**
 * PUT /
 * Update Specific Note
 */
module.exports.dashboardupdateNotes = async (req, res) => {
  try {
    await Note.findOneAndUpdate(
      { _id: req.params.id },
      { title: req.body.title, body: req.body.body, updatedAt: Date.now() }
    ).where({ user: req.user.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
  }
};
/**
 * DELETE /
 * Delete Note
 */
exports.dashboardDeleteNote = async (req, res) => {
  try {
    await Note.deleteOne({ _id: req.params.id }).where({ user: req.user.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
  }
};

/**
 * GET /
 * Add Notes
 */
exports.dashboardAddNote = async (req, res) => {
  res.render("dashboard/add", {
    layout: "../views/layout/dashboard",
  });
};

/**
 * POST /
 * Add Notes
 */
exports.dashboardAddNoteSubmit = async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Note.create(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
  }
};
/**
 * GET /
 * Search
 */
exports.dashboardSearch = async (req, res) => {
  try {
    res.render("dashboard/search", {
      searchResults: "",
      layout: "../views/layout/dashboard",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
  }
};

/**
 * POST /
 * Search For Notes
 */
exports.dashboardSearchSubmit = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const searchResults = await Note.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChars, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChars, "i") } },
      ],
    }).where({ user: req.user.id });

    res.render("dashboard/search", {
      searchResults,
      layout: "../views/layout/dashboard",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
  }
};
