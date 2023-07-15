const express = require("express");
const router = express.Router();
const handleLogout = require("../controllers/handleLogoutController");

router.get("/", handleLogout);

module.exports = router;
