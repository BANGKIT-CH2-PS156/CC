const express = require("express");
const router = express.Router();

//call middleware upload image
const upload = require("../middleware/gcsUpload");

//call users controller
const usersController = require("../controller/users");

router.route("/").get(usersController.allUsers);
router.route("/one").get(usersController.oneUserByToken);
router.route("/:id").get(usersController.oneUser);

router
.route("/")
.patch(upload.multerValidation, upload.uploadGcs, usersController.updateUser);

router
  .route("/upload")
  .post(upload.multerValidation, upload.uploadGcs, usersController.testUpload);

module.exports = router;
