const express = require("express");
const router = express.Router();

const root = require("./controller");

router.get("/", root);

module.exports = router;
