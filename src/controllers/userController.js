const { validationResult } = require("express-validator");
const { hashSync } = require("bcryptjs");
const { readJSON, writeJSON } = require("../data");
const categories = require("../data/categories.json");
const db = require("../database/models");

module.exports = {
  register: (req, res) => {
    const errors = validationResult(req);

    return res.render("users/register", {
      title: "Registro de usuario",
      categories,
      errors: errors.mapped(),
      old: req.body,
    });
  },
  processRegister: (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const { name, surname, email, password } = req.body;

      db.Address.create()
        .then((address) => {
          db.User.create({
            name: name.trim(),
            surname: surname.trim(),
            email: email.trim(),
            password: hashSync(password, 10),
            rolId: 2,
            addressId: address.id,
          }).then((user) => {
            return res.redirect("/users/login");
          });
        })
        .catch((error) => console.log(error));
    } else {
      return res.render("users/register", {
        title: "Registrate",
        old: req.body,
        errors: errors.mapped(),
        categories,
      });
    }
  },
  login: (req, res) => {
    return res.render("users/login", {
      title: "Iniciar sesion",
      categories,
    });
  },
  processLogin: (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      db.User.findOne({
        where: {
          email: req.body.email,
        },
      })
        .then(({ id, name, rolId }) => {
          req.session.userLogin = {
            id,
            name,
            rol: rolId,
          };

          if (req.body.remember) {
            res.cookie("userKitchening", req.session.userLogin, {
              maxAge: 1000 * 60,
            });
          }

          return res.redirect("/");
        })
        .catch((error) => console.log(error));
    } else {
      return res.render("users/login", {
        title: "Iniciar sesion",
        errors: errors.mapped(),
        categories,
      });
    }
  },
  profile: (req, res) => {
    return res.render("users/profile", {
      title: "Perfil de usuario",
    });
  },
  update: (req, res) => {
    return res.send(req.body);
  },
  logout: (req, res) => {
    req.session.destroy();
    return res.redirect("/");
  },
};
