const express = require("express");
const jwtChecker = require("../auth/jwt-checker");
const {
  createOrder,
  getOrderById,
  updateOrderStatus,
  getMyOrders,
} = require("../controllers/order");

const router = express.Router();

router.post("/orders", jwtChecker, createOrder);

router.get("/orders", jwtChecker, getMyOrders);

router.param("id", getOrderById);

router.put("/orders/:id", jwtChecker, updateOrderStatus); //related to getOrderById
module.exports = router;
