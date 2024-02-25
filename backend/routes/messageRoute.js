const express = require("express");
const { sendMessage, getMessages } = require("../controllers/messageController");
const {  protectRoute } = require("../middelweres/protectRoutes");
const router = express.Router();


router.post("/send/:id",protectRoute,sendMessage);
router.get("/:id" , protectRoute,getMessages)

module.exports = router