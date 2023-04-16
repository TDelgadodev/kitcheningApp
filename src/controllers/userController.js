const { validationResult } = require("express-validator");
const { hashSync } = require("bcryptjs");
const db = require("../database/models");
const { Session } = require("express-session");

module.exports = {
  register: (req, res) => {
    const errors = validationResult(req);

    return res.render("users/register", {
      title: "Registro de usuario",
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
            image : 'default-user.webp',
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
      });
    }
  },
  login: (req, res) => {
    return res.render("users/login", {
      title: "Iniciar sesion",
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
        title: "Inicio de sesión",
        errors: errors.mapped(),
      });
    }
  },
  profile: (req, res) => {
    
    db.User.findByPk(req.session.userLogin.id,{
      attributes : ['name','surname','email','image'],
        include : [
          {
            association : 'address',
            attributes : ['address','city','province','zipCode']
          }
      ],
    })
      .then(user => {
        //console.log(user)
        //return res.send(user)
          return res.render('users/profile',{
              title : "Perfil de usuario",
              user
          })
      })
      .catch(error => console.log(error))
  },
  update: async (req, res) => {
      //console.log(req.session.userLogin);
      //console.log(typeof req.body);
      //return res.send(req.body);

    const {name, surname, address, city, province, zipCode} = req.body;
    const {id} = req.session.userLogin.id

    await db.User.findByPk(req.session.userLogin.id)
      .then(user => {

        const addressUpdate = db.Address.update(
            {
                address : address ? address.trim() : null,
                city : city ? city.trim() : null,
                province: province ? province.trim() : null,
                zipCode : zipCode ? zipCode : null
            },
            {
                where : {
                    id : user.addressId
                }
            }
        )

         const userUpdate = db.User.update(
            {
                name : name,
                surname : surname,
                image : req.file ? req.file.filename : user.image
            },
            {
                where : {
                    id : id
                }
            }
        )


        Promise.all(([addressUpdate, userUpdate]))
            .then( ()=> {
                  (req.file && fs.existsSync('public/images/users/' + user.image)) && fs.unlinkSync('public/images/users/' + user.image)
                  req.session.message = "Datos actualizados"
                  return res.redirect('/users/profile')
            })
      }).catch(error => console.log(error))
          
  },
  logout: (req, res) => {
    req.session.destroy();
    return res.redirect("/");
  },
  list: (req, res) => {
    db.User.findAll({
      include: ["address", "rol"],
    })
      .then((users) => {
        return res.render("users/users", {
          users,
        });
      })
      .catch((error) => console.log(error));
  },
};
