const courses = require('../data/courses.json')

module.exports = {
    home : (req, res) => {
        /* toda la lógica!!! */
        return res.render('home',{
          title: 'Kitchening | Home',
          courses
        });
      }
}