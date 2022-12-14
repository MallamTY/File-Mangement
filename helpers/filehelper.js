'use strict';
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});



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


module.exports = {upload}