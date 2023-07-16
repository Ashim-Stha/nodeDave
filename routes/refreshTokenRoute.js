const express = require("express");
const router = express.Router();

// const handleRefreshToken = require("../controllers/refreshTokenController");
const handleRefreshToken = require("../controllersDB/refreshTokenControllerDB");

router.get("/", handleRefreshToken);

module.exports = router;
