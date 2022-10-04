const { initiateCheckoutSession } = require("../helpers/StripeHelper");
const createError = require("http-errors");
// const User = require("../models/user");
// const Order = require("../models/order");

const { ORDER_PLACED, ORDER_ABANDONED } = require("./orderConstants");

exports.createOrder = async (req, res, next) => {
  //TODO:create a checkout session for stripe and
  // TODO: redirect to stripe checkout page

  console.log("Order Creation ====");
  const { order_data } = req.body; //order_data retrieved from the (body | client)
  const { dishes, address, order_total } = order_data; //destructure data from order_data

  try {
    const session = await initiateCheckoutSession(
      { amount: order_total, user_name: "Johny" },
      next
    );
    // console.log(
    //   "🚀 ~ file: order.js ~ line 21 ~ exports.createOrder= ~ session",
    //   session
    // );

    //TODO: create a new order in order collection

    // TODO: add the order object to the user collection

    // TODO: add payment object in payment collection
    res.status(201).json(session);
  } catch (error) {
    console.log(
      "🚀 ~ file: order.js ~ line 34 ~ exports.createOrder= ~ error",
      error
    );
    next(createError(error));
  }
};
