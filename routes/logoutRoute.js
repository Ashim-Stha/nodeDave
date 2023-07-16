const express = require("express");
const router = express.Router();
// const handleLogout = require("../controllers/handleLogoutController");
const handleLogout = require("../controllersDB/handleLogoutControllerDB");

router.get("/", handleLogout);

module.exports = router;
