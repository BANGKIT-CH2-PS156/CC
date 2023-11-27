const express = require("express");
const router = express.Router();
const response = require("./../response");

router.use("/", (req, res) => {
  response(200, "Response success", "Login page", res);
});

module.exports = router;
