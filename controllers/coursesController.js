const fs = require('fs')
const courses = require("../data/courses.json");
const categories = require("../data/categories.json");
const chefs = require("../data/chefs.json");
const chefsSort = chefs.sort((a, b) =>
  a.name > b.name ? 1 : a.name < b.name ? -1 : 0
);

module.exports = {
  list: (req, res) => {
    const courses = JSON.parse(fs.readFileSync('./data/courses.json','utf-8'))
    return res.render("courses/list", {
      title: "Lista de cursos",
      categories,
      courses: courses.filter((course) => course.visible),
    });
  },
  detail: (req, res) => {
    const { id } = req.params;
    const courses = JSON.parse(fs.readFileSync('./data/courses.json','utf-8'))
    const course = courses.find((course) => course.id === +id);
    return res.render("courses/detail", {
      title: "Detalle del curso",
      ...course,
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
  store: (req, res) => {
    const { title, price, description, section, chef, visible,categoryId,image } = req.body;
    const newCourse = {
      id: courses[courses.length - 1].id + 1,
      categoryId: categoryId,
      title: title.trim(),
      price: +price,
      description: description.trim(),
      image: null,
      chef,
      status: section === "sale" && 'sale' || section === "free" && 'free' || section == "newest" && 'newest',
      visible: visible ? true : false
    };
    courses.push(newCourse);
    fs.writeFileSync('./data/courses.json',JSON.stringify(courses, null, 3),'utf-8')
    return res.redirect('/courses/list')
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
  update: (req,res) =>{
    /* receive the information */
    const { title, price, description, section, chef, visible,categoryId } = req.body;
    const id = +req.params.id;
    const course = courses.find(course => course.id === id)

    /* save the modified information in an object */
    const courseUpdated = {
      id,
      categoryId: categoryId,
      title: title.trim(),
      price: +price,
      description: description.trim(),
      image: course.image,
      chef,
      status: section === "sale" && 'sale' || section === "free" && 'free' || section == "newest" && 'newest',
      imgStatus: course.imgStatus,
      visible: visible ? true : false
    };

    /* update course array */
    
    const courseModified = courses.map(course =>{
      if(course.id === id){
        return courseUpdated
      }
      return course
    })
     /* update the database (JSON at the moment) */
     fs.writeFileSync('./data/courses.json',JSON.stringify(courseModified, null, 3),'utf-8')
    return res.redirect(`/courses/detail/${id}`)
  },
  removeConfirm: (req,res) =>{
    const id = req.params.id
    const course = courses.find(course => course.id === +id)
    return res.render('courses/confirmRemove',{
      ...course,
      categories
    })
  },
  remove: (req,res) =>{
    const id = req.params.id
    const courseDelete = courses.filter(course => course.id !== +id)
    fs.writeFileSync('./data/courses.json',JSON.stringify(courseDelete, null, 3),'utf-8')
    return res.redirect('/courses/list')
  }
};


