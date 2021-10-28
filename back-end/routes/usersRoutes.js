const express = require("express");
const router = express.Router();
const passwordCtrl = require("../middleware/auth");
const userCtrl = require("../controllers/user");

router.post("/signup", passwordCtrl, user.sigup);
router.post("/login", userCtrl, user.login);

module.exports = router;
