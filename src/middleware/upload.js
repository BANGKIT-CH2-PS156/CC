const multer = require("multer");

const storage = multer.diskStorage({
  //set save image location
  destination: (req, res, cb) => {
    cb(null, "public/img");
  },
  //set name image when save
  filename: (req, file, cb) => {
    const timestamp = new Date().getTime();
    const fileName = file.originalname;
    cb(null, `${timestamp}-${fileName}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 3.5 * 1000 * 1000, //max 3.5mb
  },
});

module.exports = upload;
