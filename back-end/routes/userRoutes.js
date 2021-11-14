const express = require("express");
const router = express.Router();
const limiter = require("../middleware/limiter");

const userCtrl = require("../controllers/user");
const password = require("../middleware/password");

router.post("/signup", limiter, userCtrl.signup);
router.post("/login", limiter, password.login);

module.exports = router;
