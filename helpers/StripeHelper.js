const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const createError = require("http-errors");

const initiateCheckoutSession = async (paymentObj, next) => {
  console.log(
    "🚀 ~ file: StripeHelper.js ~ line 6 ~ initiateCheckoutSession ~ paymentObj",
    paymentObj
  );

  const PARISCAFE_DOMAIN = process.env.PARISCAFE_DOMAIN;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
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
      "🚀 ~ file: StripeHelper.js ~ line 35 ~ initiateCheckoutSession ~ error",
      error
    );

    next(createError(error));
  }
};

module.exports = { initiateCheckoutSession };
