const express = require("express");
const router = express.Router();

const {list, detail,category, edit, add, store, update, removeConfirm,remove} = require("../controllers/coursesController");

/* /courses */

router    
    .get("/list", list)
    .get("/detail/:id", detail)
    .get('/category/:idCategory',category) 
    .get('/add',add)
    .post('/add',store)
    .get('/edit/:id',edit)
    .put('/update/:id',update)
    .get('/remove/:id',removeConfirm)
    .delete('/remove/:id',remove)
module.exports = router;
