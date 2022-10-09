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

        // get the order id and phone number
        const order = await Order.findOne({
          checkout_session_id: sessionCompleted.id,
        });
        const phone = order.address.phone;

        const orderTrackingUrl = `${process.env.FE_URL}/orders/${order._id}`;

        // get a tiny url

        const tinyUrl = await shortenUrl(orderTrackingUrl);

        // form a order success message
        const userMessage = createMessage(order._id, tinyUrl);

        //  send the message

        sendMessage(userMessage, phone);
      } catch (error) {
        console.log(
          "🚀 ~ file: payment.js ~ line 23 ~ exports.fulfilOrder= ~ error",
          error
        );
        next(createError(error));
      }

      break;

    case "charge.refunded":
      console.log("Refund initiated Successfully...");
      const refundCompleted = event.data.object;
      console.log(
        "🚀 ~ file: payment.js ~ line 61 ~ exports.fulfilOrder= ~ refundCompleted",
        refundCompleted
      );

      try {
        // update payment with refund receipt
        const payment = await Payment.findOne({
          payment_intent: refundCompleted.payment_intent,
        });
        payment.refund_receipt = refundCompleted.receipt_url;
        await payment.save();

        /// get the order object

        const order = await Order.findById({ _id: payment.order_id });
        const phone = order.address.phone;

        // form a order success message
        const userMessage = createMessage(order._id, "", "CANCEL");
        console.log(
          "🚀 ~ file: payment.js ~ line 81 ~ exports.fulfilOrder= ~ userMessage",
          userMessage
        );

        //  send the message

        sendMessage(userMessage, phone);
      } catch (error) {
        console.log(
          "🚀 ~ file: payment.js ~ line 90 ~ exports.fulfilOrder= ~ error",
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

// const Payment = require("../models/payment");
// const createError = require("http-errors");
// const { shortenUrl } = require("../helpers/BitlyHelper");
// const { sendMessage, createMessage } = require("../helpers/TwilioHelper");
// const Order = require("../models/order");

// exports.fulfilOrder = async (req, res, next) => {
//   console.log(
//     "🚀 ~ file: payment.js ~ line 3 ~ exports.fulfilOrder= ~ req",
//     req.body
//   );

//   const event = req.body;

//   switch (event.type) {
//     case "checkout.session.completed":
//       const sessionCompleted = event.data.object;

//       try {
//         console.log(
//           "🚀 ~ file: payment.js ~ line 17 ~ exports.fulfilOrder= ~ error",
//           sessionCompleted.payment_intent
//         );

//         const payment = await Payment.findByIdAndUpdate(
//           { _id: sessionCompleted.id },
//           { payment_intent: sessionCompleted.payment_intent }
//         );

//         //TODO: get the order id and phone number
//         const order = await Order.findOne({
//           checkout_session_id: sessionCompleted.id,
//         });
//         const phone = order.address.phone;

//         const orderTrackingUrl = `${process.env.FE_URL}/orders/${order._id}`;

//         //TODO: get a tiny url

//         const tinyUrl = await shortenUrl(orderTrackingUrl);

//         //todo: form a order success message
//         const userMessage = createMessage(order._id, tinyUrl);

//         // todo: send the message

//         sendMessage(userMessage, phone);
//       } catch (error) {
//         console.log(
//           "🚀 ~ file: payment.js ~ line 23 ~ exports.fulfilOrder= ~ error",
//           error
//         );
//         next(createError(error));
//       }

//       break;

//     default:
//       break;
//   }

//   res.status(200).json({ message: "Successfully Handled" });
// };
