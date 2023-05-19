const express = require("express");
const { index } = require("../../controllers/api/categoryApiController");
const router = express.Router();


/* /api/categories */

router    
    .get("/", index)
    
module.exports = router;
