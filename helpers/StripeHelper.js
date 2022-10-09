const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const createError = require("http-errors");

const Payment = require("../models/payment");

const initiateCheckoutSession = async (paymentObj, next) => {
  console.log(
    "🚀 ~ file: StripeHelper.js ~ line 5 ~ initiateCheckoutSession ~ paymentObj",
    paymentObj
  );

  const PARISCAFE_DOMAIN = process.env.PARISCAFE_DOMAIN;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: paymentObj.user_name,
            },
            unit_amount: parseInt(paymentObj.amount) * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${PARISCAFE_DOMAIN}/cart?success=true&id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${PARISCAFE_DOMAIN}/cart?canceled=true&id={CHECKOUT_SESSION_ID}`,
    });

    return session;
  } catch (error) {
    console.log(
      "🚀 ~ file: StripeHelper.js ~ line 33 ~ initiateCheckoutSession ~ error",
      error
    );

    next(createError(error));
  }
};

processRefund = async (orderId, next) => {
  try {
    const payment = await Payment.findOne({ order_id: orderId });

    console.log(
      "🚀 ~ file: payment.js ~ line 74 ~ exports.processRefund= ~ payment",
      payment.payment_intent
    );

    const refund = await stripe.refunds.create({
      payment_intent: payment.payment_intent,
    });

    console.log(refund);

    payment.refund_status = refund.status;
    await payment.save();
  } catch (error) {
    console.log(
      "🚀 ~ file: payment.js ~ line 96 ~ exports.processRefund= ~ error",
      error
    );

    next(createError(error));
  }
};

module.exports = { initiateCheckoutSession, processRefund };

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const Payment = require("../models/payment");
// const createError = require("http-errors");

// const initiateCheckoutSession = async (paymentObj, next) => {
//   console.log(
//     "🚀 ~ file: StripeHelper.js ~ line 6 ~ initiateCheckoutSession ~ paymentObj",
//     paymentObj
//   );

//   const PARISCAFE_DOMAIN = process.env.PARISCAFE_DOMAIN;

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "eur",
//             product_data: {
//               name: paymentObj.user_name,
//             },
//             unit_amount: parseInt(paymentObj.amount) * 100,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: `${PARISCAFE_DOMAIN}/cart?success=true&id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${PARISCAFE_DOMAIN}/cart?canceled=true&id={CHECKOUT_SESSION_ID}`,
//     });

//     return session;
//   } catch (error) {
//     console.log(
//       "🚀 ~ file: StripeHelper.js ~ line 35 ~ initiateCheckoutSession ~ error",
//       error
//     );

//     next(createError(error));
//   }
// };

// processRefund = async (orderId, next) => {
//   try {
//     const payment = await Payment.findOne({ order_id: orderId });

//     console.log(
//       "🚀 ~ file: payment.js ~ line 74 ~ exports.processRefund= ~ payment",
//       payment.payment_intent
//     );

//     const refund = await stripe.refunds.create({
//       payment_intent: payment.payment_intent,
//     });

//     console.log(refund);

//     payment.refund_status = refund.status;
//     await payment.save();
//   } catch (error) {
//     console.log(
//       "🚀 ~ file: payment.js ~ line 96 ~ exports.processRefund= ~ error",
//       error
//     );

//     next(createError(error));
//   }
// };

// module.exports = { initiateCheckoutSession, processRefund };
