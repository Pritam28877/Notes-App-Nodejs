module.exports.HomepageRender = (req, res) => {
  const locals = {
    title: "Node js Notes",
    description: " Free Node js notes apps ",
  };
  res.render("index", {locals ,
    layout:'../views/layout/front-page'
  });
};
module.exports.aboutPage = (req, res) => {
  const locals = {
    title: " About Page Of Node js Notes",
    description: " Free Node js notes apps ",
  };
  res.render("about", locals);
};
