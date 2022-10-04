const { initiateCheckoutSession } = require("../helpers/StripeHelper");
const createError = require("http-errors");
const User = require("../models/user");
const Order = require("../models/order");
const Payment = require("../models/payment");
const { v4: uuidv4 } = require("uuid");
const { ORDER_PLACED, ORDER_ABANDONED } = require("./orderConstants");

exports.createOrder = async (req, res, next) => {
  //TODO:create a checkout session for stripe and
  // TODO: redirect to stripe checkout page

  console.log("Order Creation ====");
  const { order_data } = req.body; //order_data retrieved from the (body | client)
  const { dishes, address, order_total } = order_data; //destructure data from order_data
  //TODO:create random order number
  const orderId = uuidv4();
  //TODO: create a status code for the order
  const status = { event: ORDER_PLACED, onDate: new Date() };
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
    const order = new Order({
      _id: orderId,
      placedBy: "103862780491452796970",
      checkout_session_id: session.id,
      contents: dishes,
      total: order_total,
      address: address,
    });

    order.status.push(status);

    const newOrder = await order.save();

    // TODO: add the order object to the user collection
    const userFilter = { _id: "103862780491452796970" };

    const updateAction = { $push: { order_history: newOrder } };

    let updatedUser = await User.findOneAndUpdate(userFilter, updateAction, {
      new: true,
    });

    // TODO: add payment object in payment collection
    const payment = new Payment({ _id: session.id, order_id: orderId });
    console.log(
      "🚀 ~ file: order.js ~ line 55 ~ exports.createOrder= ~ payment",
      payment
    );

    await payment.save();

    res.status(201).json({ redirect: session.url }); //redirect to payment
    // res.status(201).json(session);
  } catch (error) {
    console.log(
      "🚀 ~ file: order.js ~ line 34 ~ exports.createOrder= ~ error",
      error
    );
    next(createError(error));
  }
};
