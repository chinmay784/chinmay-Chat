const express = require("express");
const { signup, login, logout } = require("../controllers/auth_controller");
const { protectRoute } = require("../middelweres/protectRoutes");

const router = express.Router();

router.post("/signup",protectRoute, signup);
router.post("/login",protectRoute,login);
router.post("/logout",protectRoute,logout);


module.exports = router
