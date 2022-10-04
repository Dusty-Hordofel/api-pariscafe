const express = require("express");
const jwtChecker = require("../auth/jwt-checker");
const { createUser, fetchById, getUserById } = require("../controllers/user");

const router = express.Router();

router.post("/users", jwtChecker, createUser);

router.param("id", fetchById);

router.get("/users/:id", jwtChecker, getUserById); //related to fetchById

module.exports = router;
