const express = require("express");
const router = express.Router();

const { register, login } = require("./controller");

// router.get("/", register);
router.route("/register").get((req,res)=>{res.send('response success')});
router.route("/register").post(register);
router.route("/login").get(login);
router.route("/login").post(login);

module.exports = router;
