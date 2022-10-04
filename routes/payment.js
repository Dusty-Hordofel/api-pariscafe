const express = require("express");
const { fulfilOrder } = require("../controllers/payment");

const router = express.Router();

router.post("/payments/webhook", fulfilOrder);

module.exports = router;
