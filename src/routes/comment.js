const express = require("express");
const router = express.Router();

const commentCtrl = require("./../controller/comment");

router.route("/:idPost").get(commentCtrl.commentByPost);
router.route("/:idPost").post(commentCtrl.addComment);
router.route("/:id").delete(commentCtrl.deleteComment);

module.exports = router;
