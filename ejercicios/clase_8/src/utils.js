
// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
import multer from 'multer';

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

export const upload = multer({ storage });