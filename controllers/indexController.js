const courses = require("../data/courses.json");
const categories = require("../data/categories.json");

module.exports = {
  home: (req, res) => {
    const newCourses = courses.filter(
      (course) => course.status === "newest"
    );
    const oferCourses = courses.filter(
      (course) => course.status === "descuento")
    return res.render("home", {
      title: "Kitchening | Home",
      courses,
      newCourses,
      oferCourses,
      categories,
    });
  },
};
