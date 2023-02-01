const express = require("express");
const router = express.Router();

const {list, detail,category} = require("../controllers/coursesController");

/* /products */

router
    .get("/detail/:id", detail)
    .get("/list", list)
    .get('/category/:idCategory',category)

module.exports = router;
