const fs = require('fs')
const courses = require("../data/courses.json");
const categories = require("../data/categories.json");
const chefs = require("../data/chefs.json");
const chefsSort = chefs.sort((a, b) =>
  a.name > b.name ? 1 : a.name < b.name ? -1 : 0
);

module.exports = {
  list: (req, res) => {
    return res.render("courses/list", {
      title: "Lista de cursos",
      categories,
      courses: courses.filter((course) => course.visible),
    });
  },
  detail: (req, res) => {
    const { id } = req.params;

    const course = courses.find((course) => course.id === +id);
    return res.render("courses/detail", {
      title: "Detalle del curso",
      course,
      courses,
      categories,
    });
  },
  category: (req, res) => {
    const { idCategory } = req.params;
    const coursesFound = courses.filter(
      (course) => course.categoryId === idCategory
    );
    return res.render("courses/list", {
      title: "Products Category",
      courses: coursesFound,
      categories,
    });
  },
  add: (req, res) => {
    return res.render("courses/formAdd", {
      categories,
      chefs: chefsSort,
    });
  },
  edit: (req, res) => {
    const { id } = req.params;
    const course = courses.find((course) => course.id === +id);
    return res.render("courses/formEdit", {
      categories,
      ...course,
      chefs: chefsSort,
    });
  },
  store: (req, res) => {
    const { title, price, description, section, chef, visible,categoryId } = req.body;
    const newCourse = {
      id: courses[courses.length - 1].id + 1,
      categoryId: categoryId,
      title: title.trim(),
      price: +price,
      description: description.trim(),
      image: null,
      chef,
      status: section === "sale" && 'sale' || section === "free" && 'sale' || section == "newest" && 'newest',
      visible: visible ? true : false
    };
    courses.push(newCourse);
    fs.writeFileSync('./data/courses.json',JSON.stringify(courses, null, 3),'utf-8')
    return res.redirect('/courses/list')
  },
};
