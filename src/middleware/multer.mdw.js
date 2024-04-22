import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/temp");
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    },
    // filename: function (req, file, cb) {
    //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //     cb(null, file.fieldname + '-' + uniqueSuffix)
    //   }
});

const upload = multer({ storage });

export default upload;
