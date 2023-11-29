const express = require("express");
const router = express.Router();

const { allUsers } = require("./controller");

router.route("/").get(allUsers);

module.exports = router;
