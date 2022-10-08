const express = require("express");
const jwtChecker = require("../auth/jwt-checker");
const jwtAuthz = require("express-jwt-authz");
const {
  createOrder,
  getOrderById,
  updateOrderStatus,
  getMyOrders,
  getOrdersForAdmin,
} = require("../controllers/order");

const router = express.Router();

router.post("/orders", jwtChecker, createOrder);

router.get("/orders", jwtChecker, getMyOrders);

router.param("id", getOrderById);

router.put("/orders/:id", jwtChecker, updateOrderStatus); //related to getOrderById
router.get(
  "/orders/admin",
  jwtChecker,
  jwtAuthz(["admin:*"], {
    checkAllScopes: true,
    customScopeKey: "permissions",
    failWithError: true,
  }),
  getOrdersForAdmin
);
module.exports = router;
