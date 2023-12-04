const express = require("express");
const router = express.Router();

const root = require("../controller/root");

router.get("/", root.root);
router.route("/register").post(root.register);
router.route("/verify/:email").get(root.verifyEmail);
router.route("/login").post(root.login);
router.route("/auth/google").get(root.googleAuthorization);
router.route("/auth/google/callback").get(root.googleCallback);

module.exports = router;
