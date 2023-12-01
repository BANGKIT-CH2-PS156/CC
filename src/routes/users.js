const express = require("express");
const router = express.Router();

//call users controller
const usersController = require("../controller/users");

router.route("/").get(usersController.allUsers);

module.exports = router;
