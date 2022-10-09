const accountSid = process.env.TWILIO_ACCT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const FROM = process.env.TWILIO_PHONE_NUMBER;

const client = require("twilio")(accountSid, authToken);

const sendMessage = (msg, to) => {
  client.messages
    .create({
      body: msg,
      from: FROM,
      to: "+" + to,
    })
    .then((message) => console.log("Done"))
    .catch((err) => console.log(err));
};

const createMessage = (orderId, url, type) => {
  const TEMPLATE_CREATE = `Thank you for ordering from parisCafe. Prepaid Order # ${orderId} will be delivered in the next 30 mins. You may track your order on ${url}`;

  const TEMPLATE_CANCEL = ` We are sad to see you go. Your order ${orderId} is canceled. We have processed your refund and hope to serve you next time`;

  return type === "CANCEL" ? TEMPLATE_CANCEL : TEMPLATE_CREATE;
};

module.exports = { sendMessage, createMessage };
