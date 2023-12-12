const express = require("express");
const router = express.Router();
//call history Controller
const predictController = require("./../controller/predict");
//call middlerware to upload to GCS
const upload = require("../middleware/gcsUpload");

router.route("/").get(predictController.allPredict);
router.route("/").post(upload.multerValidation, upload.uploadGcs, predictController.addPredict);

module.exports = router;
