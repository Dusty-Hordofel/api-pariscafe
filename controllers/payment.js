const Payment = require("../models/payment");
const createError = require("http-errors");
// const { shortenUrl } = require('../helpers/BitlyHelper');
// const { sendMessage, createMessage } = require('../helpers/TwilioHelper');
const Order = require("../models/order");

exports.fulfilOrder = (req, res, next) => {
  console.log(
    "🚀 ~ file: payment.js ~ line 3 ~ exports.fulfilOrder= ~ req",
    req.body
  );

  const event = req.body;

  res.status(200).json({ message: "Successfully Handled" });
};
