const express = require("express");
const router = express.Router();

const chatCtrl = require("./../controller/chat");

router.route("/:idReceiver").get(chatCtrl.chatBox);
router.route("/:idReceiver").post(chatCtrl.addChat);

module.exports = router;
