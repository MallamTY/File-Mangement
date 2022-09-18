'use strict';

const express = require('express');
const {upload} = require('../helpers/filehelper');
const {singleFileUpload, multipleFilesUpload, getallMutitpleFile, getallSingleFile} = require('../controllers/fileUploadController');
const router = express.Router();


router.post('/singleFile', upload.single('file'), singleFileUpload);
router.post('/multipleFile', upload.array('files'), multipleFilesUpload);
router.get('/multipleFile', getallMutitpleFile);
router.get('/singleFile', getallSingleFile);

module.exports = router




