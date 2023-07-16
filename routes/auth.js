const express = require("express");
const router = express.Router();
// const handleLogin = require("../controllers/authControllers");
// const handleLogin = require("../controllers/authControllersJWT");
const handleLogin = require("../controllersDB/authControllerDB");

router.post("/", handleLogin);

module.exports = router;
