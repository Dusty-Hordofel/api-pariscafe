const acccessToken = process.env.BITLY_ACCESS_TOKEN;

const BitlyClient = require("bitly").BitlyClient;

const bitly = new BitlyClient(acccessToken);

const shortenUrl = async (url) => {
  try {
    const result = await bitly.shorten(url);

    console.log(
      "🚀 ~ file: BitlyHelper.js ~ line 12 ~ shortenUrl ~ result",
      result
    );

    return result.link;
  } catch (error) {
    console.log(
      "🚀 ~ file: BitlyHelper.js ~ line 15 ~ shortenUrl ~ error",
      error
    );
  }
};

module.exports = { shortenUrl };
