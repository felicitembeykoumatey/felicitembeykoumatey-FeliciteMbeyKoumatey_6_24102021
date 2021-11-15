const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  messages:
    "Trop de demandes de cette adresse IP, veuillez réessayer après 15 minutes",
});

module.exports = limiter;
