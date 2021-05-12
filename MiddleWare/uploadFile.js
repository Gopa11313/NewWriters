const multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/files");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + 'NEWWRITER' + file.originalname);
    },
  });
const maxSize = 20 * 1024 * 1024; // for 1MB

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log(file )
    if ( file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||file.mimetype == "application/vnd.openxmlformats-officedocument.presentationml.presentation" || file.mimetype == "application/zip" ||file.mimetype=="file/pptx" || file.mimetype == "application/pdf" || file.mimetype == "file/pdf") {
      cb(null, true);
    } else {
      cb({success: false,
        msg: 'Invalid file type. Only jpg, png image files are allowed.'},false);
    }
  },
  limits: { fileSize: maxSize },
}).single('file');
module.exports = upload