const express = require("express");
const { metrics } = require("../../controllers/api/mainApiController");
const router = express.Router();


/* /api */

router    
    .get("/metrics", metrics)
    
module.exports = router;
