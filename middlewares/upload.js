const createError = require("http-errors");
const multer = require("multer");
const path = require("path");

const tmpDir = path.join(__dirname, "../tmp");

const multerConfiq = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1048576,
  },
});

const upload = multer({
  storage: multerConfiq,
});

module.exports = upload;
