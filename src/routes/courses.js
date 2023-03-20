const express = require("express");
const router = express.Router();

const {list, detail,category, edit, add, store, update, removeConfirm,remove} = require("../controllers/coursesController");
const { uploadImagesCourse } = require("../middlewares/uploadIMG");
const courseValidator = require("../validations/courseValidator");

/* /courses */

router    
    .get("/list", list)
    .get("/detail/:id", detail)
    .get('/category/:idCategory',category) 
    .get('/add',add)
    .post('/add', uploadImagesCourse, courseValidator,store)
    .get('/edit/:id',edit)
    .put('/update/:id',uploadImagesCourse, courseValidator,update)
    .get('/remove/:id',removeConfirm)
    .delete('/remove/:id',remove)
module.exports = router;
