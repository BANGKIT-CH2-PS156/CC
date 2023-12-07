const express = require("express");
const router = express.Router();
//call controller posting
const postingController = require("./../controller/posting");
//call middleware for upload to GCS
const upload = require("./../middleware/gcsUpload");

router.route("/").get(postingController.allPosting);
router.route("/:idUser").get(postingController.allPostingByUser);
router.route("/").post(postingController.addPosting);
router.route("/:id").patch(postingController.updatePosting);
router.route("/:id").delete(postingController.deletePosting);

module.exports = router;
