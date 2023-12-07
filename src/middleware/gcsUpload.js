"use strict";
const { Storage } = require("@google-cloud/storage");
const moment = require("moment-timezone");
const path = require("path");
const response = require("../response");

const Multer = require("multer");

//save image temp to memory
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: { fileSize: 1 * 1024 * 1024 }, // Max size of file (byte), 3 MB
  fileFilter: function (req, file, cb) {
    // check allowed file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const isValidType = allowedTypes.includes(file.mimetype);

    if (isValidType) {
      cb(null, true); // Type file allowed
    } else {
      const error = new Error(
        "Invalid file type. Only jpeg, jpg, and png are allowed."
      );
      // error.status = 400; // set error
      cb(error, false);
    }
  },
});

const multerUpload = (req, res, next) => {
  // Error handler for multer
  try {
    multer.single("image")(req, res, function (err) {
      if (err instanceof Multer.MulterError) {
        // error from multer
        console.log({ error: err.message });
        return response.res400({ error: err.message }, res); //hadle error limite size
      } else if (err) {
        // Another error
        console.log({ error: err.message });
        return response.res400({ error: err.message }, res); //handle error type
      }
      next();
    });
  } catch (error) {
    console.log(error);
    return response.res500(null, res);
  }
};

const pathKey = path.resolve("./serviceaccountkey.json");

//Cloud Storage configuration
const gcs = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: pathKey,
});

//add bucket name
const bucketName = process.env.GCP_BUCKET_NAME;
const bucket = gcs.bucket(bucketName);

function getPublicUrl(filename) {
  return "https://storage.googleapis.com/" + bucketName + "/" + filename;
}

let ImgUpload = {};

ImgUpload.uploadToGcs = (req, res, next) => {
  try {
    //check available image input
    if (!req.file) return next();
    //set name for file image before upload to gcs
    const currentTime = moment().format("YYYYMMDD-HHmmss");
    const randomInt = Math.floor(Math.random() * 100) + 1;
    const gcsFileName = `${currentTime}-${randomInt}`;
    const file = bucket.file(gcsFileName);

    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    stream.on("error", (err) => {
      req.file.cloudStorageError = err;
      next(err);
    });

    stream.on("finish", () => {
      req.file.cloudStorageObject = gcsFileName;
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsFileName);
      next();
    });

    stream.end(req.file.buffer);
  } catch (error) {
    console.log(error);
    response.res500(null, res);
  }
};

module.exports = { multerUpload, ImgUpload };