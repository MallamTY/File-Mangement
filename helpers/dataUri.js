const DataURIParser = require('datauri/parser');
const parser = new DataURIParser()


exports.datauri = (reqbody) => {
    if(reqbody.file) {
        const dataUri = parser.format('image', reqbody.file.buffer)
        return dataUri
    }
    else {
        let multidatauri = parser.format('image', reqbody.buffer)
        return multidatauri
    }
   
}
