const {check} = require('express-validator');

module.exports = [

    check('title')
        .notEmpty().withMessage('El titulo del curso es necesario').bail()
        .isLength({min:6, max:20}).withMessage('El titulo debe de tener entre 6 y 20 caracteres'),

    check('price')
        .notEmpty().withMessage('Debes indicar un precio').bail()
        .isInt({min:1}).withMessage('Solo se admiten numeros positivos'),

    check('chef')
        .notEmpty().withMessage('Debes ingresar un chef'),

    check('description')
        .notEmpty().withMessage('La descripcion del curso es necesaria').bail()
        .isLength({min:20,max:85}).withMessage('La descripcion debe de tener entre 20 y 85 caracteres'),

    check('section')
        .notEmpty().withMessage('¿A que seccion pertenece?') 

]