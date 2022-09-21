 const {AWS_ACCESS_KEY, AWS_SECURITY_KEY, BUCKET_NAME, BUCKET_REGION} = require('../configuration/configuration');
 //const AWS_ACCESS_KEY = require('../configuration/configuration');
 const S3= require('aws-sdk/clients/s3');
 const fs = require('fs');



 const s3 = new S3({
     accessKeyId: AWS_ACCESS_KEY,
     secretAccessKey: AWS_SECURITY_KEY,
     region: BUCKET_REGION
 })


 exports.awsFileUploader = async(file) => {

     const fileStream = fs.createReadStream(file.path)

     const uploadParams = {
         Bucket: BUCKET_NAME,
         Key: file.filename,
         Body: fileStream
     }
      let fileUrl
      await s3.upload(uploadParams, function(err, data){
         if(err){
             console.log(err)
         }
         else{
            
          fileUrl = data.Location 
          console.log(fileUrl) 
         }
         
      })
      console.log(fileUrl)
      return fileUrl
        
    
 }

 //module.exports = awsFileUploader