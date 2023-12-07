const express = require("express");
const router = express.Router();
//call history Controller
const historyController = require("./../controller/history");
//call middlerware to upload to GCS
const upload = require("./../middleware/gcsUpload");

router.route("/:idUser").get(historyController.allHistory);
router.route("/:idUser").post(historyController.addHistory);

module.exports = router;
