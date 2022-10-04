const express = require("express");
const jwtChecker = require("../auth/jwt-checker");
const { createOrder } = require("../controllers/order");

const router = express.Router();

router.post("/users", jwtChecker, createOrder);

module.exports = router;
