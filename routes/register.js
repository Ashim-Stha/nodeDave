const express = require("express");
const router = express.Router();

const handleUser = require("../controllers/registerController");

router.post("/", handleUser);

module.exports = router;
