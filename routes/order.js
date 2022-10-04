const express = require("express");
const jwtChecker = require("../auth/jwt-checker");
const {
  createOrder,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/order");

const router = express.Router();

router.post("/orders", jwtChecker, createOrder);

router.param("id", getOrderById);

router.put("/orders/:id", jwtChecker, updateOrderStatus); //related to getOrderById
module.exports = router;
