const express = require("express");
const router = express.Router();

const {index,detail, verifyEmail} = require('../../controllers/api/usersApiController')


/* /api/users */

router    
    .get("/", index)
    .get("/:id", detail)
    .post("/verify-email",verifyEmail)
module.exports = router;
