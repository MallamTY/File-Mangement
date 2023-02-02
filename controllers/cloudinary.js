const { CLOUD_NAME, API_KEY, API_SECRET, SECURE } = require('../configuration/configuration');
const { datauri, dataurii, multiDataUri } = require('../helpers/dataUri');

var cloudinary = require('cloudinary').v2;

exports.cloudConfig = cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
    secure: SECURE
})
exports.uploads = async (body, folder) => {
    const dataUri = datauri(body)
    return cloudinary.uploader.upload(dataUri.content,{resource_type: 'auto', 
    use_filename: true, unique_filename: false,
    folder: folder}, function (err, result) {
        if(err) return err
        return result
    })
}

exports.multiUpload = async(body, folder) => {
    const dataUri = datauri(body);
   return cloudinary.uploader.upload(dataUri.content, {resource_type: 'auto', 
   use_filename: true, unique_filename: false,
   folder: folder}, function (err, result) {
       if(err) return err
       return result
   })
}

 