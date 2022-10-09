const Payment = require("../models/payment");
const createError = require("http-errors");
const { shortenUrl } = require("../helpers/BitlyHelper");
const { sendMessage, createMessage } = require("../helpers/TwilioHelper");
const Order = require("../models/order");

exports.fulfilOrder = async (req, res, next) => {
  console.log(
    "🚀 ~ file: payment.js ~ line 3 ~ exports.fulfilOrder= ~ req",
    req.body
  );

  const event = req.body;

  switch (event.type) {
    case "checkout.session.completed":
      const sessionCompleted = event.data.object;

      try {
        console.log(
          "🚀 ~ file: payment.js ~ line 17 ~ exports.fulfilOrder= ~ error",
          sessionCompleted.payment_intent
        );

        const payment = await Payment.findByIdAndUpdate(
          { _id: sessionCompleted.id },
          { payment_intent: sessionCompleted.payment_intent }
        );

        //TODO: get the order id and phone number
        const order = await Order.findOne({
          checkout_session_id: sessionCompleted.id,
        });
        const phone = order.address.phone;

        const orderTrackingUrl = `${process.env.FE_URL}/orders/${order._id}`;

        //TODO: get a tiny url

        const tinyUrl = await shortenUrl(orderTrackingUrl);

        //todo: form a order success message
        const userMessage = createMessage(order._id, tinyUrl);

        // todo: send the message

        sendMessage(userMessage, phone);
      } catch (error) {
        console.log(
          "🚀 ~ file: payment.js ~ line 23 ~ exports.fulfilOrder= ~ error",
          error
        );
        next(createError(error));
      }

      break;

    default:
      break;
  }

  res.status(200).json({ message: "Successfully Handled" });
};

exports.processRefund = async (orderId) => {
  try {
    const payment = await Payment.findOne({ orderId: orderId });
    console.log(
      "🚀 ~ file: payment.js ~ line 68 ~ exports.processRefund= ~ payment",
      payment
    );
    const refund = await stripe.refunds.create({
      payment_intent: payment.payment_intent,
    });
    console.log(
      "🚀 ~ file: payment.js ~ line 70 ~ exports.processRefund= ~ refund",
      refund
    );

    payment.refund_status = refund_status;
    await payment.save();
  } catch (error) {
    console.log(
      "🚀 ~ file: payment.js ~ line 24 ~ exports.processRefund= ~ error",
      error
    );
    next(createError(error));
  }
};
