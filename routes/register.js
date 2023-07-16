const express = require("express");
const router = express.Router();

const handleNewUser = require("../controllersDB/registerControllerDB");

router.post("/", handleNewUser);

module.exports = router;
