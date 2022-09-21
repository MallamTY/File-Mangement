'use strict';

const express = require('express');
const {upload} = require('../helpers/filehelper');
const {singleFileUpload, multipleFilesUpload} = require('../controllers/fileUploadController');
const router = express.Router();


router.post('/singleFile', upload.single('file'), singleFileUpload);
router.post('/multipleFile', upload.array('files'), multipleFilesUpload);

module.exports = router




