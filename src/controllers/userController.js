const { validationResult } = require('express-validator');
const {hashSync} = require('bcryptjs')
const { readJSON,writeJSON } = require('../data');
const categories = require('../data/categories.json');

module.exports = {
  register: (req, res) => {

    const errors = validationResult(req);

    return res.render("users/register", {
      title: "Registro de usuario",
      categories,
      errors: errors.mapped(),
      old: req.body
    });
  },    
  processRegister : (req,res) =>{

    const errors = validationResult(req);

    if(errors.isEmpty()){
      const users = readJSON('users.json')
      const {name,surname,email,password} = req.body

      const newUser = {
        id: users.length ? users[users.length -1].id + 1 : 1,
        name: name.trim(),
        surname: surname.trim(),
        email: email.trim(),
        password: hashSync(password,10),
        rol : 'user'
      }
      users.push(newUser);
      writeJSON('users.json',users);
      return res.redirect('/users/login');
    }else{
      return res.render('users/register',{
        title: 'Registrate',
        old: req.body,
        errors: errors.mapped(),
        categories
      })
    }

  },
  login: (req, res) => {

    return res.render("users/login", {
      title: "Iniciar sesion",
      categories
    });
  },
  processLogin : (req,res) =>{

    const errors = validationResult(req)

    if(errors.isEmpty()){

      const {id,name,rol} = readJSON('users.json').find(user => user.email === req.body.email)

      req.session.userLogin = {
        id,
        name,
        rol
      }
      if(req.body.remember){
        res.cookie('userKitchening', req.session.userLogin, {maxAge: 1000 * 60})
      }
      return res.redirect('/')
    }else{
      return res.render('users/login',{
        title: 'Iniciar sesion',
        errors: errors.mapped(),
        categories
      })
    }
},
  profile: (req, res) => {
    return res.render("users/profile", {
      title: "Perfil de usuario",
      categories
    });
  },
  update: (req, res) => {
    return res.send(req.body)
  },
  logout : (req, res) => {
    req.session.destroy();
    return res.redirect('/')
  },
};
