const express = require("express");
const router = express.Router();

const {index,detail} = require('../../controllers/api/courseApiController')


/* /api/courses */

router    
    .get("/", index)
    .get("/:id", detail)
module.exports = router;
