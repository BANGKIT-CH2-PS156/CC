const express = require("express");
const router = express.Router();

const root = require("../controller/root");

router.get("/", root.root);
router.route("/register").post(root.register);
router.route("/login").post(root.login);

module.exports = router;
