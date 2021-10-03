const multer = require("multer");
const path = require("path");
const helperWrapper = require("../helpers/wrapper");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/uploads/movie");
  },
  filename(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1500000,
  },
  fileFilter: (req, file, cb) => {
    if (
      path.extname(file.originalname) !== ".jpg" &&
      path.extname(file.originalname) !== ".jpeg" &&
      path.extname(file.originalname) !== ".png"
    ) {
      cb(new Error("Image only..!"));
    } else {
      cb(null, true);
    }
  },
}).single("image");

const uploadFilter = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return helperWrapper.response(res, 401, err.message, null);
    }
    if (err) {
      // An unknown error occurred when uploading.
      return helperWrapper.response(res, 401, err.message, null);
    }
    // Everything went fine.
    next();
  });
};

module.exports = uploadFilter;
