const express = require("express");
const router = express.Router();

const {list, detail} = require("../controllers/coursesController");

/* /products */

router
    .get("/detail/:id", detail)
    .get("/list", list);

module.exports = router;
