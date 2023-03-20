const {check, body} = require('express-validator');
const {readJSON} = require('../data')

module.exports = [
    check('name')
    .notEmpty().withMessage('El nombre es necesario').isLength({min:3}).withMessage('Minimo de tres caracteres').bail().isAlpha().withMessage('Solo caracteres alfabeticos'),

    check('surname')
    .notEmpty().withMessage('El apellido es necesario').isLength({min:3}).withMessage('Minimo de tres caracteres').bail().isAlpha('es-ES',{
        ignore: " "
    }).withMessage('Solo caracteres alfabeticos'),

    body('email')
    .notEmpty().withMessage('El email es obligatorio').bail().isEmail().withMessage('Debe ser un email con formato valido').custom((value, {req}) => {
        let user = readJSON('users.json').find(user => user.email === value);
        return !user // user ? false : true
    }).withMessage('El email ya se encuentra registrado'),

    check('password')
    .notEmpty().withMessage('La contraseña es obligatoria').bail().isLength({min:6, max: 12}).withMessage('Minimo de seis caracteres'),

    check('password2').notEmpty().withMessage('Debes confirmar tu contraseña').bail().custom((value,{req})=>{
        if(value !== req.body.password){
            return false
        }
        return true
    }).withMessage('Las contraseñas deben coincidir')
]
