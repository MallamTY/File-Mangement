'use strict'
const singleFile = require('../models/singleFiles')
var cloudinary = require('cloudinary').v2;
const { uploads, cloudConfig, multiUpload } = require('./cloudinary');
const { upload } = require('../helpers/filehelper');
const multipleFiles = require('../models/multipleFiles');
const singleFiles = require('../models/singleFiles');



const singleFileUpload = async(req, res, next) => {
    try {
            const cloudImage = await uploads(req,'UpdateTesting')
            const dbFile = await singleFile.create({file_url: cloudImage.url})

            return res.status(200).json({
            messge: 'Your image has been uploded successfully to cloudinary',
            dbFile
            })
}
    catch (error) {
        res.status(400).send(error.message)
    }
}

const multipleFilesUpload = async(req, res, next) => {
     try {
        // const upload = async(path) => {
        //     const data =  await uploads(path, 'UpdateTesting');
        //     return data
        //  };
        //  let url = [];
        //  let files = req.files;
        //  for (const file of files) {
        //     const {path} = file;
        //     const result = await upload(path);
        //     url.push(result.url)
        //     fs.unlinkSync(path)
        //  }
        let files = [];
        let urls = [];
         for (const file of req.files) {
            const cloudImage = await multiUpload(file, 'UpdateTesting')
            urls.push(cloudImage.url);
            files.push(file)
         }

         const dbFiles = await multipleFiles.create({file_url: urls})
         res.status(200).json({
            status: 'Success ..........',
            mesasge: 'Images succefully saved to the cloud',
            dbFiles
        })

        
      }
     
     catch (error) {
         res.status(400).send(error.message)
     }
}
   



// const fileSizeFormatter = (byte, decimal) => {
//     if (byte === 0){
//         return 'O Byte';
//     }

//     else{
//         const dm = decimal || 2;
//         const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TP', 'PB', 'EB', 'YB', 'ZB']
//         const index = Math.floor(Math.log(byte) / Math.log(1000))
//         return ((byte/Math.pow(1000, index)).toFixed(dm) + sizes[index])
        
//     }
// }

module.exports = {
    singleFileUpload,
    multipleFilesUpload

}