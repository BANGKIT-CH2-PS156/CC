"use strict";
const { Storage } = require("@google-cloud/storage");
const moment = require("moment-timezone");
const path = require("path");

const pathKey = path.resolve("./serviceaccountkey.json");

//Cloud Storage configuration
const gcs = new Storage({
  projectId: "learn-gcp-405910",
  keyFilename: pathKey,
});

//add bucket name
const bucketName = "uploadcoffee";
const bucket = gcs.bucket(bucketName);

function getPublicUrl(filename) {
  return "https://storage.googleapis.com/" + bucketName + "/" + filename;
}

let ImgUpload = {};

ImgUpload.uploadToGcs = (req, res, next) => {
  if (!req.file) return next();

  const gcsname = moment().format("YYYYMMDD-HHmmss");
  const file = bucket.file(gcsname);

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
    req.file.cloudStorageObject = gcsname;
    req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
    next();
  });

  stream.end(req.file.buffer);
};

module.exports = ImgUpload;
