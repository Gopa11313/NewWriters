const multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + 'NEWWRITER' + file.originalname);
    },
  });
const maxSize = 5 * 1024 * 1024; // for 5MB

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log(file)
    if ( file.mimetype == "image/png" ||file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    //   console.log(file )
      // console.log("here")
      cb(null, true);
    } else {
      cb({success: false,
        msg: 'Invalid file type. Only jpg, png image files are allowed.'},false);
    }
  },
  limits: { fileSize: maxSize },
}).single('cover_page');
module.exports = upload