const express = require("express");

const router = express.Router();
const {getUserForSidebar} = require("../controllers/userController");
const  {protectRoute}  = require("../middelweres/protectRoutes");


router.get("/",protectRoute,getUserForSidebar);


module.exports = router;