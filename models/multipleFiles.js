const mongoose = require('mongoose');

const schema = mongoose.Schema
const multipleFilesSchema = new schema({
    title: {
        type: String,
        required: false
    },

    file_url: {
        type: [Object],
        required: true,
    }
}, {timestamps: true})

module.exports = mongoose.model('Multiple-Files', multipleFilesSchema)