const courses = require("../data/courses.json");
const { Op } = require("sequelize");

const db = require("../database/models");

module.exports = {
  home : (req, res) => {

    const newCourses = db.Course.findAll({
      order: [["createdAt", "DESC"]],
      limit: 4,
      include : ['images']
    });

    const oferCourses = db.Course.findAll({
      where: {
        discount: {
          [Op.ne]: 0,
        },
      },
      include : ['images']
    });

    const courses = db.Course.findAll({
      include : ['images']
    });

    Promise.all([newCourses, oferCourses, courses])
    
    .then(([newCourses,oferCourses,courses]) =>{
      return res.render('home',{
        title: 'Kichening || Home',
        newCourses,
        oferCourses,
        courses
      })
    })
  },
  
  admin : (req,res) =>{
    return res.render('admin/dashboard')
  }

};
