const courses = require("../data/courses.json");
const { Op } = require("sequelize");

const db = require("../database/models");

module.exports = {
  home: (req, res) => {
    const newCourses = db.Course.findAll({
      order: [["createdAt", "DESC"]],
      limit: 6,
      include: ["images"],
    });

    const oferCourses = db.Course.findAll({
      limit : 6,
      where: {
        discount: {
          [Op.ne]: 0,
        },
      },
      include: ["images"],
    });

    const courses = db.Course.findAll({
      include: ["images"],
    });

    Promise.all([newCourses, oferCourses, courses])
    .then(([newCourses, oferCourses, courses]) => {
      //return res.send(courses)
      return res.render("home", {
        title: "Kichening || Home",
        newCourses,
        oferCourses,
        courses,
      });
    });
  },

  admin: (req, res) => {
    db.Course.findAll({
      include : ['images']
    }).then((courses) => {
      return res.render("admin/dashboard",{
        courses
      });
    });
  },
};
