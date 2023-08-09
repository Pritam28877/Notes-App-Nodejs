module.exports.homepage = async (req, res) => {
  const locals = {
    title: "Dashboard",
    description: " Free Node js notes apps ",
  };
  res.render("dashboard/index", {
    locals,
    layout: "../views/layout/dashboard",
  });
};
