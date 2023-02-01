const categories = require('../data/categories.json')

module.exports = {
  register: (req, res) => {
    return res.render("users/register", {
      title: "Registro de usuario",
      categories
    });
  },
  login: (req, res) => {
    return res.render("users/login", {
      title: "Iniciar sesion",
      categories
    });
  },
  profile: (req, res) => {
    return res.render("users/profile", {
      title: "Perfil de usuario",
      categories
    });
  },
};
