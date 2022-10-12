const express = require("express");
const jwtChecker = require("../auth/jwt-checker");
const jwtAuthz = require("express-jwt-authz");
// const {
//   createOrder,
//   getOrderById,
//   updateOrderStatus,
//   getMyOrders,
//   getOrdersForAdmin,
//   cancelOrder,
//   statusByOrderId,
//   getOrderStatusById,
// } = require("../controllers/order");
const {
  createOrder,
  getOrderById,
  updateOrderStatus,
  getMyOrders,
  getOrdersForAdmin,
  cancelOrder,
  statusByOrderId,
  getOrderStatusById,
  getMyOrderById,
} = require("../controllers/order");

const router = express.Router();

router.post("/orders", jwtChecker, createOrder);

router.get("/orders", jwtChecker, getMyOrders);

router.param("id", getOrderById);

router.get("/orders/:id", getMyOrderById);
router.put("/orders/:id", jwtChecker, updateOrderStatus);

router.get(
  "/admin/orders",
  jwtChecker,
  jwtAuthz(["admin:*"], {
    checkAllScopes: true,
    customScopeKey: "permissions",
    failWithError: true,
  }),
  getOrdersForAdmin
);

router.delete(
  "/orders/:id",
  jwtChecker,
  jwtAuthz(["admin:*", "cancel:order"], {
    checkAllScopes: false,
    customScopeKey: "permissions",
    failWithError: true,
  }),
  cancelOrder
);

router.param("orderId", statusByOrderId);

router.get("/orders/status/:orderId", getOrderStatusById);
module.exports = router;
