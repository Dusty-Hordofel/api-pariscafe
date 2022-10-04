const express = require("express");
const jwtChecker = require("../auth/jwt-checker");
const {
  createUser,
  fetchById,
  getUserById,
  updateAddress,
  getUserAddress,
} = require("../controllers/user");

const router = express.Router();

router.post("/users", jwtChecker, createUser);

router.param("id", fetchById);

router.get("/users/:id", jwtChecker, getUserById); //related to fetchById

router.put("/users/:id/address", jwtChecker, updateAddress); //related to fetchById

router.get("/users/:id/address", jwtChecker, getUserAddress); //related to fetchById

module.exports = router;
