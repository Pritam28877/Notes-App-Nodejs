const Note = require('../models/Notes');
const { ObjectId } = require('mongodb');

module.exports.homepage = async (req, res) => {
  const perPage = 12;
  const page = req.query.page || 1;

  const locals = {
    title: 'Dashboard',
    description: 'Free Node js notes apps',
  };

  try {
    const totalNotesCount = await Note.countDocuments({user: req.user.id});  
    const pages  = Math.ceil(totalNotesCount / perPage);

    const user = req.user.id;
    const notes = await Note.aggregate([
      { $sort: { updatedAt: -1 } },
      { $match: {user: new ObjectId(user)} }, // Use the ObjectId instance
      {
        $project: {
          title: { $substr: ['$title', 0, 30] },
          body: { $substr: ['$body', 0, 100] },
        },
      },
    ])
      .skip(perPage * (page - 1))
      .limit(perPage);

    res.render('dashboard/index', {
      userName: req.user.firstName,
      notes,
      locals,
      layout: '../views/layout/dashboard',
      current : page,
      pages ,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred');
  }
};
