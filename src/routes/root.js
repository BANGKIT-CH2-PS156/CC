const express = require("express");
const router = express.Router();

const root = require("../controller/root");

//call middleware
const { auth, auth2 } = require("./../middleware/authorization");

router.get("/", root.root);
router.route("/register").post(auth2, root.register);
router.route("/verify/:email").get(root.verifyEmail);
router.route("/login").post(auth2, root.login);
router.route("/auth/google").get(root.googleAuthorization);
router.route("/logout").get(auth, root.logout);
router.route("/forgot-password-user").post(root.forgotPassword);
router.route("/reset-password-user").post(root.resetPassword);

module.exports = router;
