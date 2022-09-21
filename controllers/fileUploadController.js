'use strict'
const singleFile = require('../models/singleFiles')
const multipleFile = require('../models/multipleFiles')
const { create } = require('../models/singleFiles')
const {awsFileUploader} = require('../helpers/S3handler');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink)
const {AWS_ACCESS_KEY, AWS_SECURITY_KEY, BUCKET_NAME, BUCKET_REGION} = require('../configuration/configuration');
const S3= require('aws-sdk/clients/s3');



const s3 = new S3({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECURITY_KEY,
    region: BUCKET_REGION
})


//const awsFileUploader = (file) => {

    // const fileStream = fs.createReadStream(file.path)

    // const uploadParams = {
    //     Bucket: BUCKET_NAME,
    //     Key: file.filename,
    //     Body: fileStream
    // }
    //  s3.upload(uploadParams, function(err, data){
    //     if(err){
    //         console.log(err)
    //     }
    //     else{
    //         var data = data.Location
    //         return data
    //     }
    //  })
        
    
//}

//module.exports = awsFileUploader


const singleFileUpload = async(req, res, next) => {
    try {
       // const uploadedFile = await awsFileUploader(req.file);
       const userFile = req.file;
       const fileStream = fs.createReadStream(userFile.path)

       const uploadParams = {
           Bucket: BUCKET_NAME,
           Key: userFile.filename,
           Body: fileStream
       }
        s3.upload(uploadParams, async function(err, data){
           if(err){
               console.log(err)
           }
           else{
            
            console.log(data)

            const {filename, mimetype, path, size} = req.file
            const file = new singleFile({
                fileName: filename,
                fileType: mimetype,
                filePath: path,
                fileSize: fileSizeFormatter(size, 2),
                fileLocation: data.Location
            })
                console.log()
                const savedFile = await file.save();
                await unlinkFile(req.file.path)
                res.status(201).send({
                                     message:'File Successfully Uploaded.................',
                                     uploadedFile: savedFile
                                    })
           }
        })
        
    }
    
    catch (error) {
        res.status(400).send(error.message)
    }
}

const multipleFilesUpload = async(req, res, next) => {
     try {
        
          let filesArray = []; 
          req.files.forEach(async(element) => {
              const file = {
              fileName: element.originalname,
              fileType: element.mimetype,
              filePath: element.path,
              fileSize: fileSizeFormatter(element.size, 2),
             
          }
          async function upload () {
             var s3File = await awsFileUploader(element)
             console.log(s3File)
             await unlinkFile(element.path)
          }
                  await upload()
                   filesArray.push(file);

     });
         
        
          const multipleFiles = new multipleFile({
          title: req.body.title,
          files: filesArray,

        
      })
         const files = await multipleFiles.save()
        res.status(201).send('Files Successfully Uploaded.................')
     

 }
     catch (error) {
         res.status(400).send(error.message)
     }
}
    // try {
    //           let publicUrls = [];
          
    //           const result = await Promise.all(
    //             req.files.map(async (uploadFile) => {
    //               fs.promises.readFile(uploadFile.path).then((file) => {
    //                 let body = fs.createReadStream(uploadFile.path);
    //                 const s3Params = {
    //                   Bucket: BUCKET_NAME,
    //                   Key: uploadFile.filename,
    //                   Body: body
    //                 };
          
    //                 s3.upload(s3Params)
    //                   .promise()
    //                   .then((response) => {
    //                     console.log(response.Location);
    //                     publicUrls.push(response.Location);

    //                   });
    //               });
    //             })
    //           );
    //           if (result) {
    //             console.log("Result", result);
    //             res.json(publicUrls);
    //           }
            
    // } catch (error) {
    //     console.log(error)
    // }
//}

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