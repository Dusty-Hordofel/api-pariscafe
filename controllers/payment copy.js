const Payment = require("../models/payment");
const createError = require("http-errors");
const { shortenUrl } = require("../helpers/BitlyHelper");
const { sendMessage, createMessage } = require("../helpers/TwilioHelper");
const Order = require("../models/order");

exports.fulfilOrder = async (req, res, next) => {
  //   console.log(
  //     "🚀 ~ file: payment.js ~ line 3 ~ exports.fulfilOrder= ~ req",
  //     req.body
  //   );

  const event = req.body;

  switch (event.type) {
    case "checkout.session.completed":
      const sessionCompleted = event.data.object;

      try {
        // console.log(
        //   "🚀 ~ file: payment.js ~ line 17 ~ exports.fulfilOrder= ~ error",
        //   sessionCompleted.payment_intent
        // );

        const payment = await Payment.findByIdAndUpdate(
          { _id: sessionCompleted.id },
          { payment_intent: sessionCompleted.payment_intent }
        );

        //TODO: get the order id and phone number
        const order = await Order.findOne({
          checkout_session_id: sessionCompleted.id,
        });
        const phone = order.address.phone;
        console.log(
          "🚀 ~ file: payment.js ~ line 35 ~ exports.fulfilOrder= ~ phone",
          phone
        );

        const orderTrackingUrl = `${process.env.PARIS_URL}/orders/${order._id}`; //shortUrl doesn't work whith localhost, we have to use netlify
        console.log(
          "🚀 ~ file: payment.js ~ line 37 ~ exports.fulfilOrder= ~ orderTrackingUrl",
          orderTrackingUrl
        );

        //TODO: get a tiny url

        const tinyUrl = await shortenUrl(orderTrackingUrl);
        // console.log(
        //   "🚀 ~ file: payment.js ~ line 45 ~ exports.fulfilOrder= ~ tinyUrl",
        //   tinyUrl
        // );

        //TODO: form a order success message
        const userMessage = createMessage(order._id, tinyUrl);
        console.log(
          "🚀 ~ file: payment.js ~ line 49 ~ exports.fulfilOrder= ~ userMessage",
          userMessage
        );

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

  //   res.status(200).json({ message: "Successfully Handled" });
};
