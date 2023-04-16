const fs = require("fs");
const { validationResult } = require("express-validator");
const db = require('../database/models');
const {calculateDiscountPrice} = require('../tools/calculateDiscountPrice ')

/* const chefsSort = chefs.sort((a, b) =>
  a.name > b.name ? 1 : a.name < b.name ? -1 : 0
); */


module.exports = {
  list: (req, res) => {
    db.Course.findAll({
      where : {
        visible : true
      },
      include : ['images']
    })
      .then(courses => {
        return res.render("courses/list", {
          title: "Lista de cursos",
          courses
        });
      })
      .catch(error => console.log(error))
  },
  detail: (req, res) => {
    const { id } = req.params;
    db.Course.findByPk(id,{
      include : [
        {
          association : 'images',
          attributes : ['name']
        },
        {
          association : 'chef',
          attributes : ['name']
        }
    ]
    })
    .then(course =>{
      //return res.send(course)
      return res.render("courses/detail", {
      title: "Detalle del curso",
      ...course.dataValues,
      calculateDiscountPrice
    });
  })      
    .catch(error => console.log(error))
  },
  category: (req, res) => {
    
    return res.send(req.body)

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
   const chefs = db.Chefs.findAll({
      order : [
        ['name']
      ], 
      attributes : ['name','id']
    })

    const categories = db.Category.findAll({
      order : [
        ['name']
      ],
      attributes : ['names']
    })


    Promise.all([chefs,categories])
    
    .then(([chefs,categories]) =>{
      return res.render('formAdd',{
        chefs,
        categories
      })
    })
    .catch(error => console.log(error))

  },
  store: (req, res) => {
    const errors = validationResult(req);

    if (!req.files.length) {
      errors.errors.push({
        value: "",
        msg: "El producto require de por lo menos una imagen",
        param: "image",
        location: "file",
      });
    }
    if (errors.isEmpty()) {
      const { title, price, discount,description,chef, category } = req.body;

      db.Course.create({
        title: title.trim(),
        price,
        discount,
        description: description.trim(),
        chefId : chef,
        categoryId : category,
        free : free ? true : false,
        visible : visible ? true : false
      })
      .then( course =>{
        
        req.files.forEach((image,index) =>{
            db.Image.create({
              name : image.filename,
              courseId : course.id,
              primary : index === 0 ? true : false
          })       
        })


        return res.redirect("/courses/list");
      })
      .catch(error => console.log(error))
  
    } else {
      if (req.files.length) {
        req.files.forEach((file) => {
          fs.existsSync(`./public/images/courses/${file.filename}`) &&
          fs.unlinkSync(`./public/images/courses/${file.filename}`);
        });
      }
      const categories = require("../data/categories.json");
      const chefs = require("../data/chefs.json");
      const chefsSort = chefs.sort((a, b) =>
        a.name > b.name ? 1 : a.name < b.name ? -1 : 0
      );

      return res.render("courses/formAdd", {
        categories,
        chefs: chefsSort,
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },
  edit: (req, res) => {
    const { id } = req.params;
    const chefs = db.Chef.findAll({
      order : [
        ['name']
      ],
      attributes : ['name','id']
    })

    const categories = db.Category.findAll({
      order : [['name']],
      attributes : ['name','id']
    })
    
    Promise.all([chefs,categories])
    .then(([chefs,categories]) =>{
      return res.render('formEdit',{
        chefs,
        categories
      })
    })
    .catch(error => console.log(error))



  },
  update: (req, res) => {
    const errors = validationResult(req);

    if(req.fileValidationError){
      errors.errors.push({
        value: "",
        msg: req.fileValidationError,
        param: "images",
        location: "files"
      })
    }

    if (errors.isEmpty()) {
      const { title, price, description, chef, visible, categoryId } = req.body;


      db.Course.create(
        {
          title : title.trim(),
          price,
          discount
        }
        
        ).then( ()=>{

        })



      const courseUpdated = {
        id,
        categoryId: categoryId,
        title: title.trim(),
        price: +price,
        description: description.trim(),
        images: req.files.length ? req.files.map(file => file.filename) : course.images,
        chef,
        status:
          (section === "sale" && "sale") ||
          (section === "free" && "free") ||
          (section == "newest" && "newest"),
        imgStatus: course.imgStatus,
        visible: visible ? true : false,
      };
      const courseModified = courses.map((course) => {
        if (course.id === id) {
          return courseUpdated;
        }
        return course;
      });
      fs.writeFileSync(
        "./data/courses.json",
        JSON.stringify(courseModified, null, 3),
        "utf-8"
      );
      return res.redirect(`/courses/detail/${id}`);
    } else {
      const { id } = req.params;
      const course = courses.find((course) => course.id === +id);
      return res.render("courses/formEdit", {
        categories,
        ...course,
        chefs: chefsSort,
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },
  remove: async (req, res) => {
    const id = req.params.id;

    const course = await db.Course.findByPk(id,{
      include : {all : true}
    })

    db.Comment.destroy({

      where: {
        courseId : id
      }
      
    }).then( ()=>{

        db.Course.destroy({
          where : {
            id
          }

        })
          .then(result =>{
            return res.redirect("/admin");
          })     
    })
      .catch(error => console.log(error))
  },
};
