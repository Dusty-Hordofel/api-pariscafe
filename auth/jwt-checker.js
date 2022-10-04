const jwt = require("express-jwt");
const jwks = require("jwks-rsa");

//TODO: use express-jwt to validate token

const jwtChecker = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-3m3vgdiu.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "http//api-pariscafe",
  issuer: "https://dev-3m3vgdiu.us.auth0.com/",
  algorithms: ["RS256"],
});

module.exports = jwtChecker;
