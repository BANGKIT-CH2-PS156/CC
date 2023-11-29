const express = require("express");
const router = express.Router();

const { register, login } = require("./controller");

// router.get("/", register);
router.route("/").get(register);
router.route("/login").get(login);

module.exports = router;
