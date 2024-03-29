const { initiateCheckoutSession } = require("../helpers/StripeHelper");
const createError = require("http-errors");
const User = require("../models/user");
const Order = require("../models/order");
const Payment = require("../models/payment");
const OrderStatus = require("../models/order_status");
const { v4: uuidv4 } = require("uuid");
const { ORDER_PLACED, ORDER_ABANDONED } = require("./orderConstants");
const { processRefund } = require("../helpers/StripeHelper");
const { getUser } = require("../auth/AuthHelper");

const { connectedClients, webSocketIO } = require("../helpers/web-sockets");

exports.getOrdersForAdmin = async (req, res, next) => {
  const status = req.query.status || ORDER_PLACED;

  const limit = parseInt(req.query.limit) || 10;

  var query = {
    $expr: {
      $eq: [
        {
          $last: "$status.event",
        },
        status,
      ],
    },
  };

  var projections = {
    _id: 1,
    status: 1,
    contents: 1,
    total: 1,
    address: 1,
  };

  var options = { sort: { createdAt: -1 }, limit, skip: 0 };

  try {
    const orders = await Order.find(query, projections, options);
    if (orders.length === 0)
      throw createError(404, "No Orders found for this criteria");

    res.status(200).json(orders);
  } catch (error) {
    console.log(
      "🚀 ~ file: order.js ~ line 60 ~ exports.getOrdersForAdmin= ~ error",
      error
    );
    next(createError(error));
  }
};

exports.getMyOrders = async (req, res, next) => {
  const userId = getUser(req);
  const limit = parseInt(req.query.limit) || 10;

  try {
    const orders = await User.aggregate([
      { $match: { _id: userId } },
      { $unwind: "$order_history" },
      { $sort: { "order_history.createdAt": -1 } },
      { $addFields: { lastStatus: { $last: "$order_history.status" } } },
      { $match: { "lastStatus.event": { $not: { $eq: ORDER_ABANDONED } } } },
      { $limit: limit },
      { $group: { _id: userId, orders: { $push: "$order_history" } } },
      { $project: { _id: 0, orders: 1 } },
    ]);

    res.status(200).json(orders[0]);
  } catch (error) {
    console.log(
      "🚀 ~ file: order.js ~ line 39 ~ exports.getMyOrders= ~ error",
      error
    );

    next(createError(error));
  }
};

exports.cancelOrder = async (req, res, next) => {
  console.log(
    "🚀 ~ file: order.js ~ line 108 ~ exports.cancelOrder= ~ req",
    req.user
  );

  const userId = getUser(req);

  const order = req.order;

  const { new_status } = req.body;

  const updatedOrder = await updateStatus(order, new_status, next);

  //make a stripe call to refund
  processRefund(order._id, next);

  res
    .status(200)
    .json({ status: updatedOrder.status[updatedOrder.status.length - 1] });
};

exports.updateOrderStatus = async (req, res, next) => {
  const userId = getUser(req);

  const order = req.order;

  const { new_status } = req.body;

  const updatedOrder = await updateStatus(order, new_status, next);

  res
    .status(200)
    .json({ status: updatedOrder.status[updatedOrder.status.length - 1] });
};

async function updateStatus(order, newStatus, next) {
  const updatedStatus = order.status;

  const newEvent = { event: newStatus, onDate: new Date() };

  updatedStatus.push(newEvent);

  try {
    order.status = updatedStatus;
    const updatedOrder = await order.save();
    const user = await User.findById({ _id: order.placedBy });

    const updateOrderHistory = user.order_history;

    const userOrder = updateOrderHistory.find(
      (user_order) => user_order._id === order._id
    );
    userOrder.status.push(newEvent);

    await User.updateOne(
      { _id: order.placedBy },
      { order_history: updateOrderHistory }
    );

    await OrderStatus.updateOne(
      { _id: order._id },
      { status: order.status },
      { upsert: true }
    );

    pushMessageToClient(updatedOrder, newStatus);

    return updatedOrder;
  } catch (error) {
    console.log("🚀 ~ file: order.js ~ line 152 ~ updateStatus ~ error", error);
    next(createError(error));
  }
}

function pushMessageToClient(order, newStatus) {
  const socketId = connectedClients[order.placedBy].socket;

  socketId &&
    webSocketIO().to(socketId).emit("order-update", {
      action: "UPDATE",
      order: order,
      status: newStatus,
      time: new Date(),
    });
}

exports.getOrderById = async (req, res, next, id) => {
  const criteria = {
    $or: [{ _id: { $in: id } }, { checkout_session_id: { $in: id } }],
  };

  try {
    const order = await Order.findOne(criteria);
    console.log(
      "🚀 ~ file: order.js ~ line 232 ~ exports.getOrderById= ~ order",
      order
    );

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

  try {
    const session = await initiateCheckoutSession(
      { amount: order_total, user_name: address.full_name },
      next
    );
    console.log(
      "🚀 ~ file: order.js ~ line 21 ~ exports.createOrder= ~ session",
      session
    );

    //TODO: create a new order in order collection

    const order = new Order({
      _id: orderId,
      placedBy: userId,
      checkout_session_id: session.id,
      contents: dishes,
      total: order_total,
      address: address,
    });

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

    const orderStatus = new OrderStatus({
      _id: orderId,
    });

    orderStatus.status.push(status);

    await orderStatus.save();

    res.status(201).json({ redirect: session.url });
  } catch (error) {
    console.log(
      "🚀 ~ file: order.js ~ line 27 ~ exports.createOrder= ~ error",
      error
    );
    next(createError(error));
  }
};

exports.statusByOrderId = async (req, res, next, orderId) => {
  try {
    const order = await OrderStatus.findById(orderId);

    if (!order) {
      next(createError(400, "Order not found"));
    }

    req.order = order;

    next();
  } catch (error) {}
};

exports.getOrderStatusById = async (req, res) => {
  const order = req.order;

  res.status(200).json(order.status);
};

exports.getMyOrderById = async (req, res) => {
  const order = req.order;

  res.status(200).json(order);
};

/*const { initiateCheckoutSession } = require("../helpers/StripeHelper");
const createError = require("http-errors");
const User = require("../models/user");
const Order = require("../models/order");
const Payment = require("../models/payment");
const OrderStatus = require("../models/order_status");
const { v4: uuidv4 } = require("uuid");
const { ORDER_PLACED, ORDER_ABANDONED } = require("./orderConstants");
const { processRefund } = require("../helpers/StripeHelper");
const { getUser } = require("../auth/AuthHelper");
const { connectedClients, webSocketIO } = require("../helpers/web-sockets");

exports.getOrdersForAdmin = async (req, res, next) => {
  const status = req.query.status || ORDER_PLACED;

  const limit = parseInt(req.query.limit) || 10;

  var query = {
    $expr: {
      $eq: [
        {
          $last: "$status.event",
        },
        status,
      ],
    },
  };

  var projections = {
    _id: 1,
    status: 1,
    contents: 1,
    total: 1,
    address: 1,
  };

  var options = { sort: { createdAt: -1 }, limit, skip: 0 };

  try {
    const orders = await Order.find(query, projections, options);
    if (orders.length === 0)
      throw createError(404, "No Orders found for this criteria");

    res.status(200).json(orders);
  } catch (error) {
    console.log(
      "🚀 ~ file: order.js ~ line 60 ~ exports.getOrdersForAdmin= ~ error",
      error
    );
    next(createError(error));
  }
};

exports.getMyOrders = async (req, res, next) => {
  const userId = getUser(req);
  const limit = parseInt(req.query.limit) || 10;

  try {
    const orders = await User.aggregate([
      { $match: { _id: userId } },
      { $unwind: "$order_history" },
      { $sort: { "order_history.createdAt": -1 } },
      { $addFields: { lastStatus: { $last: "$order_history.status" } } },
      { $match: { "lastStatus.event": { $not: { $eq: ORDER_ABANDONED } } } },
      { $limit: limit },
      { $group: { _id: userId, orders: { $push: "$order_history" } } },
      { $project: { _id: 0, orders: 1 } },
    ]);

    res.status(200).json(orders[0]);
  } catch (error) {
    console.log(
      "🚀 ~ file: order.js ~ line 39 ~ exports.getMyOrders= ~ error",
      error
    );

    next(createError(error));
  }
};

exports.cancelOrder = async (req, res, next) => {
  console.log(
    "🚀 ~ file: order.js ~ line 108 ~ exports.cancelOrder= ~ req",
    req.user
  );

  const userId = getUser(req);

  const order = req.order;

  const { new_status } = req.body;

  const updatedOrder = await updateStatus(order, new_status, next);

  //make a stripe call to refund
  processRefund(order._id, next);

  res
    .status(200)
    .json({ status: updatedOrder.status[updatedOrder.status.length - 1] });
};

exports.updateOrderStatus = async (req, res, next) => {
  const userId = getUser(req);

  const order = req.order;

  const { new_status } = req.body;

  const updatedOrder = await updateStatus(order, new_status, next);

  res
    .status(200)
    .json({ status: updatedOrder.status[updatedOrder.status.length - 1] });
};

async function updateStatus(order, newStatus, next) {
  const updatedStatus = order.status;

  const newEvent = { event: newStatus, onDate: new Date() };

  updatedStatus.push(newEvent);

  try {
    order.status = updatedStatus;
    const updatedOrder = await order.save();
    const user = await User.findById({ _id: order.placedBy });

    const updateOrderHistory = user.order_history;

    const userOrder = updateOrderHistory.find(
      (user_order) => user_order._id === order._id
    );
    userOrder.status.push(newEvent);

    await User.updateOne(
      { _id: order.placedBy },
      { order_history: updateOrderHistory }
    );

    await OrderStatus.updateOne(
      { _id: order._id },
      { status: order.status },
      { upsert: true }
    );

    pushMessageToClient(updatedOrder, newStatus);

    return updatedOrder;
  } catch (error) {
    console.log("🚀 ~ file: order.js ~ line 152 ~ updateStatus ~ error", error);
    next(createError(error));
  }
}

function pushMessageToClient(order, newStatus) {
  const socketId = connectedClients[order.placedBy].socket;

  socketId &&
    webSocketIO().to(socketId).emit("order-update", {
      action: "UPDATE",
      order: order,
      status: newStatus,
      time: new Date(),
    });
}

exports.getOrderById = async (req, res, next, id) => {
  const criteria = {
    $or: [{ _id: { $in: id } }, { checkout_session_id: { $in: id } }],
  };

  try {
    const order = await Order.findOne(criteria);
    console.log(
      "🚀 ~ file: order.js ~ line 232 ~ exports.getOrderById= ~ order",
      order
    );

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

  try {
    const session = await initiateCheckoutSession(
      { amount: order_total, user_name: address.full_name },
      next
    );
    console.log(
      "🚀 ~ file: order.js ~ line 21 ~ exports.createOrder= ~ session",
      session
    );

    //TODO: create a new order in order collection

    const order = new Order({
      _id: orderId,
      placedBy: userId,
      checkout_session_id: session.id,
      contents: dishes,
      total: order_total,
      address: address,
    });

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

    const orderStatus = new OrderStatus({
      _id: orderId,
    });

    orderStatus.status.push(status);

    await orderStatus.save();

    res.status(201).json({ redirect: session.url });
  } catch (error) {
    console.log(
      "🚀 ~ file: order.js ~ line 27 ~ exports.createOrder= ~ error",
      error
    );
    next(createError(error));
  }
};

exports.statusByOrderId = async (req, res, next, orderId) => {
  try {
    const order = await OrderStatus.findById(orderId);

    if (!order) {
      next(createError(400, "Order not found"));
    }

    req.order = order;

    next();
  } catch (error) {}
};

exports.getOrderStatusById = async (req, res) => {
  const order = req.order;

  res.status(200).json(order.status);
};

exports.getMyOrderById = async (req, res) => {
  const order = req.order;

  res.status(200).json(order);
};*/
