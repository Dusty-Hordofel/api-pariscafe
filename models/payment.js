const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },
    order_id: {
      type: String,
    },
    payment_intent: {
      type: String,
    },
    refund_status: {
      type: String,
    },
    refund_receipt: {
      type: String,
    },
    __v: {
      type: Number,
      select: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
