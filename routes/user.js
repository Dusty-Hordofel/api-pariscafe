const express = require("express");
const jwtChecker = require("../auth/jwt-checker");
const { createUser } = require("../controllers/user");

const router = express.Router();

router.post("/users", jwtChecker, createUser);

module.exports = router;
