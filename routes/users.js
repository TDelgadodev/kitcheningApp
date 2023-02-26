const express = require('express');
const router = express.Router();

const {register,login,profile, processRegister, processLogin, update} = require('../controllers/userController');
const loginUserValidator = require('../validations/loginUserValidator');
const registerUserValidator = require('../validations/registerUserValidator');

/* /users */

router
    .get('/register',register)
    .post('/register', registerUserValidator ,processRegister)
    .get('/login',login)
    .post('/login'/* ,loginUserValidator */ ,processLogin)
    .get('/profile',profile)
    .put('/update',update)

module.exports = router;
