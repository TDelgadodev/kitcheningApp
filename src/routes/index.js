const express = require('express');
const router = express.Router();
const {home, admin} = require('../controllers/indexController');
const checkUserAdmin = require('../middlewares/checkUserAdmin');

/* / */
router.get('/', home);
router.get('/admin',admin)

module.exports = router;
