'use strict';
const multer = require('multer');
const path = require('path');
const DataUri = require('datauri');




// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     }
// });
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image');


const multiMulterUploads = multer({storage}).array('images')
//const dUri = new DataUri();
/**
* @description This function converts the buffer to data url
* @param {Object} req containing the field object
* @returns {String} The data url from the string buffer
*/
//exports.dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);



const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' 
        || file.mimetype === 'application/pdf' || file.mimetype === 'audio/mpeg'|| file.mimetype === 'video/mp4' ){
        cb(null, true)
    }

    else{
        cb(null, false)
    }
}

const upload = multer({storage: storage, fileFilter: filefilter})


module.exports = {upload, multerUploads, multiMulterUploads}