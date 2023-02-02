'use strict';

const express = require('express');
const {upload, multerUploads, multiMulterUploads} = require('../helpers/filehelper');
const {singleFileUpload, multipleFilesUpload} = require('../controllers/fileUploadController');
const router = express.Router();


router.post('/singleFile', multerUploads, singleFileUpload);
router.post('/multipleFile', multiMulterUploads, multipleFilesUpload);

module.exports = router



multiMulterUploads