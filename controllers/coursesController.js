const courses = require("../data/courses.json");
const categories = require("../data/categories.json");
module.exports = {
  list: (req, res) => {
    return res.render("courses/list", {
      title: "Lista de cursos",
      courses,
      categories
    });
  },
  detail: (req, res) => {
    const { id } = req.params;

    const course = courses.find((course) => course.id === +id);
    return res.render("courses/detail", {
      title: "Detalle del curso",
      course,
      courses,
      categories
    });
  },
  category: (req, res) => {
    const { idCategory } = req.params;
    const coursesFound = courses.filter(course => course.categoryId === idCategory);     
       return res.render("courses/list", {
   
      title: "Products Category",
      courses: coursesFound,
      categories,
    }); 
  },
};
