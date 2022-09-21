const mongoose = require('mongoose');

const schema = mongoose.Schema
const multipleFilesSchema = new schema({
    title: {
        type: String,
        required: true
    },
    files: [Object],

    file_location: [Object]
}, {timestamps: true})

module.exports = mongoose.model('Multiple-Files', multipleFilesSchema)