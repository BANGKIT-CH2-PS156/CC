const express = require("express");
const router = express.Router();
//call controller posting
const postingController = require("./../controller/posting");
//call middleware for upload to GCS
const upload = require("./../middleware/gcsUpload");

router.route("/").get(postingController.allPosting);
router.route("/user").get(postingController.allPostingByUser);
router.route("/:idPosting").get(postingController.onePosting);
router
  .route("/")
  .post(
    upload.multerValidation,
    upload.uploadGcs,
    postingController.addPosting
  );
router
  .route("/:id")
  .patch(
    upload.multerValidation,
    upload.uploadGcs,
    postingController.updatePosting
  );
router.route("/:id").delete(postingController.deletePosting);

module.exports = router;
