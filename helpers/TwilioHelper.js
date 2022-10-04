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

const createMessage = (orderId, url) => {
  const TEMPLATE_CREATE = `Thank you for ordering from parisCafe. Prepaid Order # ${orderId} will be delivered in the next 30 mins. You may track your order on ${url}`;

  return TEMPLATE_CREATE;
};

module.exports = { sendMessage, createMessage };
