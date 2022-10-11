const mongoose = require("mongoose");

const orderStatusSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    status: {
      type: Array,
      default: [],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("OrderStatus", orderStatusSchema);
