const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const {register,login,profile, processRegister, processLogin, update, logout, list} = require('../controllers/userController');
const checkUser = require('../middlewares/checkUser');
const checkUserLogin = require('../middlewares/checkUserLogin');
const { registerUserValidator,loginUserValidator } = require('../validations');
const checkUserAdmin = require('../middlewares/checkUserAdmin');

/* /users */

router
    .get('/register',checkUser,register)
    .post('/register', registerUserValidator ,processRegister)
    .get('/login', checkUser,login)
    .post('/login',loginUserValidator ,processLogin)
    .get('/profile', checkUserLogin,profile)
    .put('/update',update)
    .get('/logout', checkUserLogin,logout)
    .get('/list',list)

module.exports = router;
