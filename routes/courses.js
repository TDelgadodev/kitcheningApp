const express = require("express");
const router = express.Router();

const {list, detail,category, edit, add} = require("../controllers/coursesController");

/* /courses */

router    
    .get("/list", list)
    .get("/detail/:id", detail)
    .get('/category/:idCategory',category) 
    .get('/add',add)
    .get('/edit/:id',edit)

module.exports = router;
