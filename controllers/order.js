const { initiateCheckoutSession } = require("../helpers/StripeHelper");
const createError = require("http-errors");
const User = require("../models/user");
const Order = require("../models/order");
const Payment = require("../models/payment");
const { v4: uuidv4 } = require("uuid");
const { ORDER_PLACED, ORDER_ABANDONED } = require("./orderConstants");

const { getUser } = require("../auth/AuthHelper");

exports.updateOrderStatus = async (req, res, next) => {
  const userId = getUser(req);

  const order = req.order;
  console.log(
    "🚀 ~ file: order.js ~ line 17 ~ exports.updateOrderStatus= ~ order",
    order
  );

  const updatedStatus = order.status;

  const newEvent = { event: ORDER_ABANDONED, onDate: new Date() };
  updatedStatus.push(newEvent);

  try {
    order.status = updatedStatus;

    const updatedOrder = await order.save();

    const user = await User.findById({ _id: userId });
    const updatedOrderHistory = user.order_history;

    const userOrder = updatedOrderHistory.find(
      (user_order) => user_order._id === order._id
    );
    userOrder.status.push(newEvent);

    await User.updateOne(
      { _id: userId },
      { order_history: updatedOrderHistory }
    );

    res
      .status(200)
      .json({ status: updatedOrder.status[updatedOrder.status.length - 1] });
  } catch (error) {
    console.log(
      "🚀 ~ file: order.js ~ line 42 ~ exports.updateOrderStatus= ~ error",
      error
    );

    next(createError(error));
  }
};

exports.getOrderById = async (req, res, next, id) => {
  const criteria = {
    $or: [{ _id: { $in: id } }, { checkout_session_id: { $in: id } }],
  };

  try {
    const order = await Order.findOne(criteria);

    if (!order) {
      return next(createError(404, "Order not found"));
    }

    req.order = order;
    next();
  } catch (error) {
    console.log(
      "🚀 ~ file: order.js ~ line 30 ~ exports.getOrderById= ~ error",
      error
    );
    next(createError(error));
  }
};

exports.createOrder = async (req, res, next) => {
  //TODO:create a checkout session for stripe and
  // TODO: redirect to stripe checkout page

  console.log("Order Creation ====");
  const { order_data } = req.body;
  const { dishes, address, order_total } = order_data;

  const orderId = uuidv4();
  const status = { event: ORDER_PLACED, onDate: new Date() };

  const userId = getUser(req);
  // console.log(
  //   "🚀 ~ file: order.js ~ line 23 ~ exports.createOrder= ~ userId ",
  //   userId
  // );

  try {
    const session = await initiateCheckoutSession(
      { amount: order_total, user_name: address.full_name },
      next
    );
    // console.log(
    //   "🚀 ~ file: order.js ~ line 21 ~ exports.createOrder= ~ session",
    //   session
    // );

    //TODO: create a new order in order collection

    const order = new Order({
      _id: orderId,
      placedBy: userId,
      checkout_session_id: session.id,
      contents: dishes,
      total: order_total,
      address: address,
    });
    // console.log(
    //   "🚀 ~ file: order.js ~ line 48 ~ exports.createOrder= ~ order",
    //   order
    // );

    order.status.push(status);

    const newOrder = await order.save();
    // TODO: add the order object to the user collection

    const userFilter = { _id: userId };
    const updateAction = { $push: { order_history: newOrder } };

    let updatedUser = await User.findOneAndUpdate(userFilter, updateAction, {
      new: true,
    });

    // TODO: add payment object in payment collection

    const payment = new Payment({ _id: session.id, order_id: orderId });

    await payment.save();
    console.log(
      "🚀 ~ file: order.js ~ line 70 ~ exports.createOrder= ~ payment",
      payment
    );

    res.status(201).json({ redirect: session.url });
  } catch (error) {
    console.log(
      "🚀 ~ file: order.js ~ line 27 ~ exports.createOrder= ~ error",
      error
    );
    next(createError(error));
  }
};
