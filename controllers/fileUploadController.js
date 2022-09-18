'use strict'
const singleFile = require('../models/singleFiles')
const multipleFile = require('../models/multipleFiles')
const { create } = require('../models/singleFiles')
const {awsFileUploader} = require('../helpers/S3handler');


const singleFileUpload = async(req, res, next) => {
    try {
        
        const {filename , mimetype, path, size} = req.file
        const file = new singleFile({
            fileName: filename,
            fileType: mimetype,
            filePath: path,
            fileSize: fileSizeFormatter(size, 2)
        })
            const savedFile = await file.save();
            const uploadedFile = await awsFileUploader(req.file);
            console.log(uploadedFile);
            res.status(201).send('File Successfully Uploaded.................')
    }
    
    catch (error) {
        res.status(400).send(error.message)
    }
}

const multipleFilesUpload = async(req, res, next) => {
    try {
        
         let filesArray = [];
        //for(let element = 0; element < (req.files).length; element++);
         req.files.forEach(element => {
             const file = {
             fileName: element.originalname,
             fileType: element.mimetype,
             filePath: element.path,
             fileSize: fileSizeFormatter(element.size, 2)
         }
         filesArray.push(file);

    });

         const multipleFiles = new multipleFile({
         title: req.body.title,
         files: filesArray
        
     })
        await multipleFiles.save()
        console.log(`\n Files successfully uploaded in our database`)
        res.status(201).send('Files Successfully Uploaded.................')
     

}
    catch (error) {
        res.status(400).send(error.message)
    }
}

const getallSingleFile = async(req, res, next) => {
    try {
        const file = await singleFile.find()
        res.status(200).send(file)
    } catch (error) {
        res.status(400).send(error.message)
    }
}



const getallMutitpleFile = async(req, res, next) => {
    try {
        const files = await multipleFile.find()
        res.status(200).send(files)
    } catch (error) {
        res.status(400).send(error.message)
    }
}



const fileSizeFormatter = (byte, decimal) => {
    if (byte === 0){
        return 'O Byte';
    }

    else{
        const dm = decimal || 2;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TP', 'PB', 'EB', 'YB', 'ZB']
        const index = Math.floor(Math.log(byte) / Math.log(1000))
        return ((byte/Math.pow(1000, index)).toFixed(dm) + sizes[index])
        
    }
}

module.exports = {
    singleFileUpload,
    multipleFilesUpload,
    getallMutitpleFile,
    getallSingleFile
}