const fs = require("fs");

const deleteFile = (filePath) => {
  // eslint-disable-next-line no-console
  console.log("PROSES DELETE", filePath);
  // fs.existSync
  if (fs.existsSync(filePath)) {
    // fs.unlink
    fs.unlink(filePath, (error) => {
      if (error) {
        return error.message("delete unsuccessful");
      }
    });
  }
};

module.exports = deleteFile;
